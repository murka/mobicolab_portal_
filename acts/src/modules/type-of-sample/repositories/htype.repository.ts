import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { HType } from '../models/htype.model';

@EntityRepository(HType)
export class HTypeRepository extends Repository<HType> {
  logger = new Logger(this.constructor.name);
}
