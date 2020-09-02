import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetHabitnQuery } from '../impl/get-habitan.query';
import { Logger } from '@nestjs/common';
import { HabitanRepository } from '../../habitan.repository';
import { Habitan } from '../../models/habitan.model';

@QueryHandler(GetHabitnQuery)
export class GetHabitanHandler implements IQueryHandler<GetHabitnQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly habitanRepository: HabitanRepository) {}

  async execute(query: GetHabitnQuery): Promise<Habitan> {
    this.logger.verbose('get-habitan');

    const { id } = query;

    try {
      return await this.habitanRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
