import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetHTypeQuery } from '../impl/get-hype.query';
import { Logger } from '@nestjs/common';
import { HabitansTypeRepository } from '../../habitans-type.repository';
import { HType } from '../../models/habitans-type.model';

@QueryHandler(GetHTypeQuery)
export class GetHTypeHandler implements IQueryHandler<GetHTypeQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly htypeRepository: HabitansTypeRepository) {}

  async execute(query: GetHTypeQuery): Promise<HType> {
    this.logger.verbose('get-htype');

    const { id } = query;

    try {
      return await this.htypeRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
