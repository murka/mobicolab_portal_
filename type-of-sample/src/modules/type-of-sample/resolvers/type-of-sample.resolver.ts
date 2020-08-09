import { Resolver, Query, Args } from '@nestjs/graphql';
import { TypeOfSample } from '../models/type-of-sample.model';
import { Logger } from '@nestjs/common';
import { TypeOfSampleRepository } from '../repositories/type-of-sample.repository';

@Resolver(of => TypeOfSample)
export class TypeOfSampleResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tosRepository: TypeOfSampleRepository) {}

  @Query(returns => TypeOfSample)
  async getTypeOfSample(@Args('id') id: string): Promise<TypeOfSample> {
    this.logger.verbose('get-type-of-sample.query');

    try {
      return await this.tosRepository.getTypeOfSampleById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
