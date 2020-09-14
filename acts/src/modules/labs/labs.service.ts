import { Injectable, Logger } from '@nestjs/common';
import { LabRepository } from './labs.repositroy';
import { Lab } from './models/lab.model';
import { Act } from '../acts/models/act.model';

@Injectable()
export class LabsService {
  logger = new Logger(this.constructor.name);

  constructor(private readonly labRepositroy: LabRepository) {}

  async findLabById(id: string): Promise<Lab> {
    this.logger.verbose('find-lab.method');

    try {
      return this.labRepositroy.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getActsOfLab(id: string): Promise<Act[]> {
    this.logger.verbose('get-acts-of-lab.command');

    try {
      let acts: Act[] = [];

      const lab = await this.labRepositroy.findOne(id);

      if (!lab) return acts;

      return acts;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async labCreated(id: string): Promise<void> {
    this.logger.verbose(`lab-created ${id}`);

    try {
      const lab = this.labRepositroy.create({ id: id });

      await this.labRepositroy.save(lab);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async labUpdated(id: string): Promise<void> {
    this.logger.verbose('lab-updated');

    try {
      const lab = await this.labRepositroy.findOne(id);

      if (lab) {
        return;
      } else {
        const lab = this.labRepositroy.create({ id: id });

        await this.labRepositroy.save(lab);
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
