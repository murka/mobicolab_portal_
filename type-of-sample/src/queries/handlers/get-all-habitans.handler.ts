import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllHabitansQuery } from '../impl/get-all-habitans.query';
import { Logger } from '@nestjs/common';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
import { Habitan } from 'src/modules/type-of-sample/models/habitan.model';

@QueryHandler(GetAllHabitansQuery)
export class GetAllHabitansHandler
  implements IQueryHandler<GetAllHabitansQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly habitanRepository: HabitanRepository) {}

  async execute(query: GetAllHabitansQuery): Promise<Habitan[]> {
    this.logger.verbose('get-all-habitans.query-handler');

    try {
      return await this.habitanRepository.getAllHabitan();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
