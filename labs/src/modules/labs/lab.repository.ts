import { EntityRepository, Repository } from 'typeorm';
import { Lab } from './models/lab.model';
import { Act } from './models/act.model';
import { Logger } from '@nestjs/common';
import { MigrationLabDto } from './models/dto/migration-lab.dto';

@EntityRepository(Lab)
export class LabRepository extends Repository<Lab> {
  logger = new Logger(this.constructor.name);

  async migrationCreateLab(lab: MigrationLabDto): Promise<Lab> {
    this.logger.verbose('migration-create-lab.method inside `LabRepository`');

    const newLab = this.create({
      fullname: lab.fullname,
      label: lab.label,
      address: lab.address,
      email: lab.email,
      tel: lab.tel,
    });

    await this.save(newLab);

    this.logger.log(newLab);

    return newLab;
  }
}

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {}
