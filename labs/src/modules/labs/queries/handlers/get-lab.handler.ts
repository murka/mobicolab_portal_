import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetLabQuery } from '../impl/get-lab.query';
import { LabRepository } from '../../lab.repository';
import { Lab } from '../../models/lab.model';
import { Logger } from '@nestjs/common';

@QueryHandler(GetLabQuery)
export class GetLabHandler implements IQueryHandler<GetLabQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly labRepository: LabRepository) {}

  async execute(query: GetLabQuery): Promise<Lab> {
    this.logger.verbose('get-lab.handler');

    const { labId } = query;

    try {
      return (await this.labRepository.find())[0];
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
