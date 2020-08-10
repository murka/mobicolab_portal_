import { EntityRepository, Repository } from 'typeorm';
import { Act } from '../models/act.model';
import { Logger } from '@nestjs/common';

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {
  logger = new Logger(this.constructor.name);
}
