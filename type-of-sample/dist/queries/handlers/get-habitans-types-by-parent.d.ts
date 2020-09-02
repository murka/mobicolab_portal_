import { IQueryHandler } from '@nestjs/cqrs';
import { GetHabitansTypesByParentQuery } from '../impl/get-habitans-types-by-parent.query';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
import { Logger } from '@nestjs/common';
import { HabitansType } from 'src/modules/type-of-sample/models/habitans-type.model';
export declare class GetAllHabitansHandler implements IQueryHandler<GetHabitansTypesByParentQuery> {
    private readonly habitanRepository;
    logger: Logger;
    constructor(habitanRepository: HabitanRepository);
    execute(query: GetHabitansTypesByParentQuery): Promise<HabitansType[]>;
}
