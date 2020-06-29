import { Resolver, Query, Args } from '@nestjs/graphql';
import { LabTypeOfSampleTemplateModel } from './models/lab-type-of-sample.model';
import { Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLabTypeTemplateQuery } from './queries/impl/getLabTypeTemplate.query';

@Resolver(of => LabTypeOfSampleTemplateModel)
export class TemplateResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Query(returns => LabTypeOfSampleTemplateModel)
  async getLabTypeOfSampleTemplate(
    @Args('labId') labId: string,
    @Args('typeId') typeId: string,
  ): Promise<LabTypeOfSampleTemplateModel> {
    this.logger.verbose('get-lab-type.query');

    return await this.queryBus.execute(new GetLabTypeTemplateQuery(labId, typeId));
  }
}
