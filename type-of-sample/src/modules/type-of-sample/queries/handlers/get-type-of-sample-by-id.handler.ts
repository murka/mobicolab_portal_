import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTypeOfSampleByIdQuery } from '../impl/get-type-of-sample-by-id.query';
import { Logger } from '@nestjs/common';
import { TypeOfSample } from '../../models/type-of-sample.model';
import { TypeOfSampleRepository } from '../../repositories/type-of-sample.repository';

@QueryHandler(GetTypeOfSampleByIdQuery)
export class GetTypeOfSampleByIdHandler
  implements IQueryHandler<GetTypeOfSampleByIdQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tosRepository: TypeOfSampleRepository) {}

  async execute(query: GetTypeOfSampleByIdQuery): Promise<TypeOfSample> {
    this.logger.verbose('get-type-of-sample.query');

    const { id } = query;

    try {
      return await this.tosRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
