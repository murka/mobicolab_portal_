import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Doc } from './models/doc.model';
import { TitlingDocInput } from './models/dto/titling-doc.input';
import { DroppingDocCommand } from './commands/impl/dropping-doc.command';
import { TitlingDocCommand } from './commands/impl/titling-doc.command';
import { Logger } from '@nestjs/common';
import { GetAllDocsOfActQuery } from './queries/impl/get-all-docs-of-act.query';
import { DocRepository } from './repositories/doc.repository';
import { RemoveDocCommand } from './commands/impl/remove-doc.command';
import { DocsService } from './docs.service';
import { SynService } from './syn.service';

@Resolver(of => Doc)
export class DocsResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private commandBus: CommandBus,
    private readonly queyBus: QueryBus,
    private readonly docRepository: DocRepository,
    private readonly docService: DocsService,
    private readonly synService: SynService,
  ) {}

  @Query(returns => [Doc])
  async docs(@Args('actId') actId: string): Promise<Doc[]> {
    this.logger.verbose(`quering all docs in act with id: ${actId}`);

    const docs = await this.docRepository.find();

    return docs;
  }

  @Query(returns => String, { nullable: true })
  async getFileDownloadLink(@Args('docId') docId: string): Promise<void> {
    this.logger.verbose(`get-file-download-link to doc: ${docId}`);

    try {
      this.synService.login();
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  @Mutation(returns => Doc)
  async droppDoc(
    @Args('actId') actId: string,
    @Args('name') name: string,
    @Args('mimetype') mimetype: string,
  ): Promise<Doc> {
    this.logger.verbose(`mutation dropp-doc`);

    this.logger.verbose(name);

    this.logger.verbose(mimetype);

    try {
      return await this.commandBus.execute(
        new DroppingDocCommand(actId, name, null, mimetype),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(returns => Doc)
  async titlingDoc(
    @Args('titlingDocData') titlingDocData: TitlingDocInput,
  ): Promise<Doc> {
    this.logger.verbose(
      `titling doc with data: ${JSON.stringify(titlingDocData)}`,
    );
    return this.commandBus.execute(
      new TitlingDocCommand(
        titlingDocData.actId,
        titlingDocData.docId,
        titlingDocData.name,
        titlingDocData.mimtype,
        titlingDocData.title,
      ),
    );
  }

  @Mutation(returns => Doc, { nullable: true })
  async removeDoc(
    @Args({ name: 'docId', type: () => String }) docId: Doc['id'],
  ): Promise<Doc> {
    this.logger.verbose(`removing doc with id: ${docId}`);
    return this.commandBus.execute(new RemoveDocCommand(docId));
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    this.logger.verbose('resolve reference of docs');

    return await this.docService.getDoc(reference.id);
  }
}
