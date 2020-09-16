import { EntityRepository, Repository } from 'typeorm';
import { Act } from '../models/act.model';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MigrationCreateActDto } from '../models/dto/migration-create-act.dto';

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {
  logger = new Logger(this.constructor.name);

  async findActById(id: string): Promise<Act> {
    this.logger.verbose('find-act-by-id');

    try {
      const act = this.findOne(id, { relations: ['customer', 'generalCustomer', 'lab', 'typeOfSample'] });

      if (!act)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Act didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      return act;
    } catch (error) {
      this.logger.error(error);
    }
  }

  //   async migrationCreateAct(act: MigrationCreateActDto): Promise<Act> {
  //     this.logger.verbose('inside ActRepolsitory - createAct method');
  //     const newAct = new Act();
  //     newAct.name = act.name;
  //     newAct.typeOfSample = act.typeOfSample
  //     newAct.objectName = act.objectName
  //     newAct.place = act.place;
  //     newAct.datetime = act.datetime
  //     newAct.method = act.method
  //     newAct.toolType = act.toolType
  //     newAct.climaticEnvironmental = act.climaticEnvironmental
  //     newAct.planning = act.planning
  //     newAct.normativeDocument = act.normativeDocument
  //     newAct.sampleType = act.sampleType
  //     newAct.sample = act.sample
  //     newAct.preparation = act.preparation
  //     newAct.goal = act.goal
  //     newAct.definedIndicators = act.definedIndicators
  //     newAct.additions = act.additions
  //     newAct.informationAboutSelection = act.informationAboutSelection
  //     newAct.environmentalEngineer = act.environmentalEngineer
  //     newAct.representative = act.representative
  //     newAct.passedSample = act.passedSample
  //     newAct.application = act.application

  //     return await this.save(newAct)
  //   }
}
