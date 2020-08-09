import { EntityRepository, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { HabitansType } from '../models/habitans-type.model';

@EntityRepository(HabitansType)
export class HabitansTypeRepository extends Repository<HabitansType> {
  logger = new Logger(this.constructor.name);

  async createHabitansType(label: string): Promise<HabitansType> {
    this.logger.verbose('create-habitans-type.method');

    try {
      const ht = this.create({ label: label });

      return await this.save(ht);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateHabitansType(id: string, label: string): Promise<HabitansType> {
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
