
import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { TypeOfSample } from '../models/type-of-sample.model';
import { Logger } from '@nestjs/common';
import { TypeOfSampleRepository } from '../repositories/type-of-sample.repository';
import { QueryBus } from '@nestjs/cqrs';
import { GetTypeOfSampleByIdQuery } from '../queries/impl/get-type-of-sample-by-id.query';

@Resolver(of => TypeOfSample)
export class TypeOfSampleResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly tosRepository: TypeOfSampleRepository,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(returns => TypeOfSample)
  async getTypeOfSample(@Args('id') id: string): Promise<TypeOfSample> {
    this.logger.verbose('get-type-of-sample.query');

    try {
      return await this.tosRepository.getTypeOfSampleById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<TypeOfSample> {
    this.logger.verbose('resolve reference of type-sample');

    return await this.queryBus.execute(
      new GetTypeOfSampleByIdQuery(reference.id),
    );
  }
}
