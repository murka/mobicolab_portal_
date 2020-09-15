import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetActQuery } from '../impl/get-act.query';
import { Logger } from '@nestjs/common';
import { ActRepository } from '../../repositories/act.repository';
import { Act } from '../../models/act.model';

@QueryHandler(GetActQuery)
export class GetActHandler implements IQueryHandler<GetActQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actRepository: ActRepository) {}

  async execute(query: GetActQuery): Promise<Act> {
    this.logger.verbose('get-act.hanler');

    const { actId } = query;

    try {
      return await this.actRepository.findActById(actId)
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
