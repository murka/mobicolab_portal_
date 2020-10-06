import { EntityRepository, Repository } from 'typeorm';
import { Act } from '../models/act.model';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {
  logger = new Logger(this.constructor.name);

  async creteAct(id: string): Promise<void> {
    this.logger.verbose('create-act');

    try {
      const act = this.create({ id });

      await this.save(act);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAct(id: string): Promise<Act> {
    this.logger.verbose('find-act');

    try {
      let act = await this.findOne(id, { relations: ['docs'] });

      if (!act) {
        const newAct = this.create({ id: id });

        await this.save(newAct);

        act = await this.findOne(id, { relations: ['docs'] });
      }
      // throw new HttpException(
      //   { status: HttpStatus.NOT_FOUND, error: 'Act didn`t find' },
      //   HttpStatus.NOT_FOUND,
      // );

      return act;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
