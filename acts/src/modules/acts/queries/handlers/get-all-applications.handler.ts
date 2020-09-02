import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllApplicationsQuery } from '../impl/get-all-applications.query';
import { Application } from '../../models/application.model';
import { Logger } from '@nestjs/common';
import { ApplicationRepository } from '../../repositories/application.repository';

@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationHandler
  implements IQueryHandler<GetAllApplicationsQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly appRepositroy: ApplicationRepository) {}

  async execute(): Promise<Application[]> {
    this.logger.verbose('get-all-application.handler');

    try {
      return await this.appRepositroy.find();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
