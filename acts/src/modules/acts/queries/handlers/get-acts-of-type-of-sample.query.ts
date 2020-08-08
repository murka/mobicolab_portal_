import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetActsOfTypeOfSampleQuery } from '../impl/get-acts-of-type-of-sample.query';
import { Logger } from '@nestjs/common';
import { Act } from '../../models/act.model';
import { TypeOfSampleRepository } from '../../references.repository';

@QueryHandler(GetActsOfTypeOfSampleQuery)
export class GetActsOfTypeOfSampleHandler
  implements IQueryHandler<GetActsOfTypeOfSampleQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tosRepository: TypeOfSampleRepository) {}

  async execute(query: GetActsOfTypeOfSampleQuery): Promise<Act[]> {
    this.logger.verbose('get-acts-of-type-sample.query-hadler');

    const { id } = query;

    try {
      return (await this.tosRepository.findOne(id)).acts;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
