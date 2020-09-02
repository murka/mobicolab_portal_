import { EntityRepository, Repository } from 'typeorm';
import { Lab } from './models/lab.model';
import { Logger } from '@nestjs/common';

@EntityRepository(Lab)
export class LabRepository extends Repository<Lab> {
  logger = new Logger(this.constructor.name);

  async changeId(newId: string, oldId: string): Promise<void> {
    this.logger.verbose('changer id inside repository');

    const lab = await this.findOne(oldId);

    if (lab) {
      await this.update(lab, { id: newId });
    }
  }
}
