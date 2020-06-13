import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { PubSub } from 'graphql-subscriptions';

import { CommandBus } from '@nestjs/cqrs';
import { Doc } from './models/doc.model';
import { TitlingDocInput } from './models/dto/titling-doc.input';
import { DroppingDocCommand } from './commands/impl/dropping-doc.command';
import { TitlingDocCommand } from './commands/impl/titling-doc.command';
import { SavingDocInput } from './models/dto/saving-doc.input';
import { RemoveDocCommand } from './commands/impl/remove-doc.command';
import { Inject, Logger } from '@nestjs/common';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { SavingDocCommand } from './commands/impl/saving-doc.command';
import { DeletingDocCommand } from './commands/impl/deleting-doc.command';
import { DocSubscriptionsPayload } from './models/doc-subscription-payload.model';
import { SavingAllDocsCommand } from './commands/impl/saving-all-docs.command';
import { SavingAllDocsInput } from './models/dto/saving-all-docs.input';

@Resolver(of => Doc)
export class DocsResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private commandBus: CommandBus,
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: PubSub,
  ) {}

  @Query(returns => [Doc])
  async docs(@Args('actId') actId: string): Promise<Doc[]> {
    this.logger.verbose(`quering all docs in act with id: ${actId}`);
    let docs;
    const act = await this.prisma.act.findOne({ where: { id: actId } });
    if (!act) {
      await this.prisma.act.create({ data: { id: actId } });
      docs = [];
    } else {
      docs = await this.prisma.act.findOne({ where: { id: actId } }).doc();
    }
    return docs;
  }

  @Mutation(returns => Doc)
  async droppDoc(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('actId') actId: string,
    @Args('name') name: string,
  ): Promise<any> {
    this.logger.verbose(
      `mutation droppDoc wit filename: ${name}, in act: ${actId}`,
    );
    const fileStream = file.createReadStream();

    return await this.commandBus.execute(
      new DroppingDocCommand(fileStream, actId, name),
    );
  }

  @Mutation(returns => Doc)
  async titlingDoc(
    @Args('titlingDocData') titlingDocData: TitlingDocInput,
  ): Promise<Doc> {
    this.logger.verbose(
      `titling doc with data: ${JSON.stringify(titlingDocData)}`,
    );
    return this.commandBus.execute(
      new TitlingDocCommand(titlingDocData.title, titlingDocData.docId),
    );
  }

  @Mutation(returns => Doc)
  async savingDoc(
    @Args('savingDocData') savingDocData: SavingDocInput,
    { docId, actId } = savingDocData,
  ): Promise<Doc> {
    this.logger.verbose(
      `savingDoc mutation with data: ${JSON.stringify(savingDocData)}`,
    );

    return await this.commandBus.execute(new SavingDocCommand(docId, actId));
  }

  @Mutation(returns => [Doc])
  async savingAllDocs(
    @Args('savingAllDocsData') savingAllDocData: SavingAllDocsInput,
    { docs, actId } = savingAllDocData,
  ): Promise<Doc[]> {
    this.logger.verbose(`saving All ${savingAllDocData.docs.length} docs`);
    return await this.commandBus.execute(new SavingAllDocsCommand(docs, actId));
  }

  @Mutation(returns => Doc)
  async removeDoc(
    @Args({ name: 'docId', type: () => String }) docId: Doc['id'],
  ): Promise<Doc> {
    this.logger.verbose(`removing doc with id: ${docId}`);
    return this.commandBus.execute(new RemoveDocCommand(docId));
  }

  @Mutation(returns => Doc)
  async deleteDoc(
    @Args({ name: 'docId', type: () => String }) docId: string,
    @Args('actId') actId: string,
  ): Promise<Doc> {
    this.logger.verbose(`deleting doc with id: ${docId} in act ${actId}`);
    return this.commandBus.execute(new DeletingDocCommand(docId, actId));
  }

  @Subscription(returns => DocSubscriptionsPayload)
  async changeDocs(@Args({ name: 'actId', type: () => String }) actId: string) {
    this.logger.verbose('subscription addDoc');
    return this.pubsub.asyncIterator(`Act_${actId}_added`);
  }
}
