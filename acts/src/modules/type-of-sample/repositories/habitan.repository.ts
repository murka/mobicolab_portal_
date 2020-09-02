import { Habitan } from '../models/habitan.model';
import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@EntityRepository(Habitan)
export class HabitanRepository extends Repository<Habitan> {
  logger = new Logger(this.constructor.name);
}
