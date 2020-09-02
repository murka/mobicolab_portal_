import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllHTypesQuery } from '../impl/get-all-htypes.query';
import { Logger } from '@nestjs/common';
import { HtypesModule } from '../../htypes.module';
import { HabitansTypeRepository } from '../../habitans-type.repository';

@QueryHandler(GetAllHTypesQuery)
export class GetAllHTypesHandler implements IQueryHandler<GetAllHTypesQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly htypesRepository: HabitansTypeRepository) {}

  async execute(query: GetAllHTypesQuery): Promise<HtypesModule[]> {
    this.logger.verbose('get-all-htypes.handler');

    try {
      return await this.htypesRepository.find();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
