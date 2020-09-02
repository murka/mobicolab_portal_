import { Repository } from 'typeorm';
import { Habitan } from '../models/habitan.model';
import { Logger } from '@nestjs/common';
import { HabitansType } from '../models/habitans-type.model';
export declare class HabitanRepository extends Repository<Habitan> {
    logger: Logger;
    getAllHabitan(): Promise<Habitan[]>;
    newHabitan(label: string): Promise<Habitan>;
    updateHabitan(id: string, label: string): Promise<Habitan>;
    getHabitansTypesByParent(id: string): Promise<HabitansType[]>;
}
