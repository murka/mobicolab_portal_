import { EntityRepository, Repository } from 'typeorm';
import { Habitan } from './models/habitan.model';
import {
  Logger,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HType } from '../htypes/models/habitans-type.model';
import { HabitanEvent } from './models/habitan-events.model';

@EntityRepository(Habitan)
export class HabitanRepository extends Repository<Habitan> {
  logger = new Logger(this.constructor.name);

  async getAllHabitan(): Promise<Habitan[]> {
    this.logger.verbose('get-all-habitan.method');

    try {
      const habitans = await this.find();

      return habitans;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getHabitanById(id: string): Promise<Habitan> {
    this.logger.verbose('get-habitan-by-id');

    try {
      const habitan = await this.findOne(id);

      if (!habitan)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Habitan didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      return habitan;
    } catch (error) {
      this.logger.error(error.message);
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
    this.logger.verbose('update-habitan.method');

    try {
      const habitan = await this.findOne(id);

      if (!habitan)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Habitan didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      habitan.label = label;

      return await this.save(habitan);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getHabitansTypesByParent(id: string): Promise<HType[]> {
    this.logger.verbose('get-habitans-types-by-parent.method');

    try {
      const habitan = await this.findOne(id);

      return habitan.htypes;
    } catch (error) {
      this.logger.error(error);
    }
  }
}

@EntityRepository(HabitanEvent)
export class HabitanEventRepository extends Repository<HabitanEvent> {}
