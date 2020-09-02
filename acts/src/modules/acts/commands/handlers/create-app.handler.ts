import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAppCommand } from '../impl/create-app.command';
import { Logger } from '@nestjs/common';
import { Application } from '../../models/application.model';
import { ApplicationRepository } from '../../repositories/application.repository';

@CommandHandler(CreateAppCommand)
export class CreateAppHandler implements ICommandHandler<CreateAppCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly appRepository: ApplicationRepository) {}

  async execute(): Promise<Application> {
    this.logger.verbose('create-app.handler');

    try {
      const app = this.appRepository.create();

      return await this.appRepository.save(app);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
