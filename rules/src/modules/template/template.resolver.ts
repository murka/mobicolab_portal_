import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { LabTypeOfSampleTemplateModel } from './models/lab-type-of-sample.model';
import { Logger } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetLabTypeTemplateQuery } from './queries/impl/getLabTypeTemplate.query';
import { NewLabTypeOfSampleTemplate } from './models/dto/new-lab-type-of-sample-template.dto';
import { CreateLabTypeTemplateCommand } from './commands/impl/create-lab-type-template.command';

@Resolver(of => LabTypeOfSampleTemplateModel)
export class TemplateResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(returns => LabTypeOfSampleTemplateModel)
  async getLabTypeOfSampleTemplate(
    @Args('labId') labId: string,
    @Args('typeId') typeId: string,
  ): Promise<LabTypeOfSampleTemplateModel> {
    this.logger.verbose('get-lab-type.query');

    return await this.queryBus.execute(
      new GetLabTypeTemplateQuery(labId, typeId),
    );
  }

  @Mutation(returns => LabTypeOfSampleTemplateModel)
  async createLabTypeOfSampleTemplate(
    @Args('newLabTypeOfSampleTemplateData')
    newLabTypeOfSampleTemplateData: NewLabTypeOfSampleTemplate,
  ): Promise<LabTypeOfSampleTemplateModel> {
    this.logger.verbose(
      `create-lab-type.mutation with data: ${newLabTypeOfSampleTemplateData}`,
    );

    return this.commandBus.execute(
      new CreateLabTypeTemplateCommand(
        newLabTypeOfSampleTemplateData.labId,
        newLabTypeOfSampleTemplateData.typeId,
        newLabTypeOfSampleTemplateData.path,
      ),
    );
  }
}
