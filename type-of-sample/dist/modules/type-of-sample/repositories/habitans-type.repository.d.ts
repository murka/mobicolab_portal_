import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { HabitansType } from '../models/habitans-type.model';
export declare class HabitansTypeRepository extends Repository<HabitansType> {
    logger: Logger;
    createHabitansType(label: string): Promise<HabitansType>;
    updateHabitansType(id: string, label: string): Promise<HabitansType>;
}
