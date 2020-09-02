import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTOSQuery } from '../impl/get-tos.query';
import { Logger } from '@nestjs/common';
import { TypeOfSample } from '../../models/type-of-sample.model';
import { TOSRepository } from '../../repositories/tos.repository';

@QueryHandler(GetTOSQuery)
export class GetTOSHandler implements IQueryHandler<GetTOSQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tosRepositrory: TOSRepository) {}

  async execute(query: GetTOSQuery): Promise<TypeOfSample> {
    this.logger.verbose('get-tos.handler');

    const { id } = query;

    try {
      return await this.tosRepositrory.findOne(id, {
        relations: ['habitan', 'htype'],
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
