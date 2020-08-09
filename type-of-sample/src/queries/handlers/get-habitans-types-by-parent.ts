import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetHabitansTypesByParentQuery } from '../impl/get-habitans-types-by-parent.query';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
import { Logger } from '@nestjs/common';
import { HabitansType } from 'src/modules/type-of-sample/models/habitans-type.model';

@QueryHandler(GetHabitansTypesByParentQuery)
export class GetAllHabitansHandler
  implements IQueryHandler<GetHabitansTypesByParentQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly habitanRepository: HabitanRepository) {}

  async execute(query: GetHabitansTypesByParentQuery): Promise<HabitansType[]> {
    this.logger.verbose('get-all-habitans.query-handler');

    const { id } = query;

    try {
      return await this.habitanRepository.getHabitansTypesByParent(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
