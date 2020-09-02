import { IQueryHandler } from '@nestjs/cqrs';
import { GetAllHabitansQuery } from '../impl/get-all-habitans.query';
import { Logger } from '@nestjs/common';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
import { Habitan } from 'src/modules/type-of-sample/models/habitan.model';
export declare class GetAllHabitansHandler implements IQueryHandler<GetAllHabitansQuery> {
    private readonly habitanRepository;
    logger: Logger;
    constructor(habitanRepository: HabitanRepository);
    execute(query: GetAllHabitansQuery): Promise<Habitan[]>;
}
