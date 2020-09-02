import { Habitan } from '../models/habitan.model';
import { Logger } from '@nestjs/common';
import { HabitansType } from '../models/habitans-type.model';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
export declare class HabitanResolver {
    private readonly queryBus;
    private readonly commandBus;
    logger: Logger;
    constructor(queryBus: QueryBus, commandBus: CommandBus);
    getAllHabitans(): Promise<Habitan[]>;
    createHabitan(label: string): Promise<Habitan>;
    updateHabitan(id: string, label: string): Promise<Habitan>;
    htypes(habitan: Habitan): Promise<HabitansType[]>;
    createHabitnsType(habitan: Habitan, label: string): Promise<HabitansType>;
    updateHabitansType(id: string, label: string): Promise<HabitansType>;
}
