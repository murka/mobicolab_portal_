import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetHabitansTypesByParentQuery } from '../impl/get-habitans-types-by-parent.query';
import { HabitanRepository } from 'src/modules/habitans/habitan.repository';
import { Logger } from '@nestjs/common';
import { HType } from 'src/modules/htypes/models/habitans-type.model';

@QueryHandler(GetHabitansTypesByParentQuery)
export class GetHabitansTypesByParentHandler
  implements IQueryHandler<GetHabitansTypesByParentQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly habitanRepository: HabitanRepository) {}

  async execute(query: GetHabitansTypesByParentQuery): Promise<HType[]> {
    this.logger.verbose('get-all-habitans.query-handler');

    const { id } = query;

    try {
      return await this.habitanRepository.getHabitansTypesByParent(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
