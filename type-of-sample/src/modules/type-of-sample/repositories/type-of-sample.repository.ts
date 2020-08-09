import { EntityRepository, Repository } from 'typeorm';
import { TypeOfSample } from '../models/type-of-sample.model';
import { Logger, NotFoundException } from '@nestjs/common';
import { throwError } from 'rxjs';

@EntityRepository(TypeOfSample)
export class TypeOfSampleRepository extends Repository<TypeOfSample> {
  logger = new Logger(this.constructor.name);

  async getTypeOfSampleById(id: string): Promise<TypeOfSample> {
    this.logger.verbose('get-type-of-sample-by-id.method');

    try {
      const tos = await this.findOne(id);

      if (!tos) {
        throw new NotFoundException();
      }

      return tos;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
