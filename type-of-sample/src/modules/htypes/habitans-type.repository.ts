import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { HType } from './models/habitans-type.model';
import { HTypeEvent } from './models/habitans-types-event.model';

@EntityRepository(HType)
export class HabitansTypeRepository extends Repository<HType> {
  logger = new Logger(this.constructor.name);

  async createHabitansType(label: string): Promise<HType> {
    this.logger.verbose('create-habitans-type.method');

    try {
      const ht = this.create({ label: label });

      return await this.save(ht);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findHTypeById(id: string): Promise<HType> {
    this.logger.verbose('find-htype-by-id');

    try {
      const htype = await this.findOne(id, { relations: ['habitan'] });

      if (!htype)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'HType didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      return htype;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async updateHabitansType(id: string, label: string): Promise<HType> {
    this.logger.verbose('update-habitans-type.method');

    try {
      const ht = await this.findOne(id);

      ht.label = label;

      return await this.save(ht);
    } catch (error) {
      this.logger.error(error);
    }
  }
}

@EntityRepository(HTypeEvent)
export class HTypeEventRepository extends Repository<HTypeEvent> {}
