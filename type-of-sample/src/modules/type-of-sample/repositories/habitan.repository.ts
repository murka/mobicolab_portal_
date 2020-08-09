import { EntityRepository, Repository } from 'typeorm';
import { Habitan } from '../models/habitan.model';
import { Logger, NotFoundException } from '@nestjs/common';
import { HabitansType } from '../models/habitans-type.model';

@EntityRepository(Habitan)
export class HabitanRepository extends Repository<Habitan> {
  logger = new Logger(this.constructor.name);

  async getAllHabitan(): Promise<Habitan[]> {
    this.logger.verbose('get-all-habitan.method');

    try {
      const habitans = await this.find();

      if (!habitans) {
        throw new NotFoundException();
      }

      return habitans;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async newHabitan(label: string): Promise<Habitan> {
    this.logger.verbose('new-habitan.method');

    try {
      const newHabitan = this.create({ label: label });

      return await this.save(newHabitan);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateHabitan(id: string, label: string): Promise<Habitan> {
    this.logger.verbose('new-habitan.method');

    try {
      const habitan = await this.findOne(id);

      habitan.label = label;

      return await this.save(habitan);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getHabitansTypesByParent(id: string): Promise<HabitansType[]> {
    this.logger.verbose('get-habitans-types-by-parent.method');

    try {
      const habitan = await this.findOne(id);

      return habitan.htypes;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
