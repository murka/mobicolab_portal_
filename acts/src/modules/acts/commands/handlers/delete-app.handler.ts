import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAppCommand } from '../impl/delete-app.command';
import { Logger } from '@nestjs/common';
import { Application } from '../../models/application.model';
import { ApplicationRepository } from '../../repositories/application.repository';
import { DeleteResult } from 'typeorm';

@CommandHandler(DeleteAppCommand)
export class DeleteAppHandler implements ICommandHandler<DeleteAppCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly appRepository: ApplicationRepository) {}

  async execute(command: DeleteAppCommand): Promise<Application> {
    this.logger.verbose('delte-app-handler');

    const { id } = command;

    try {
      const app = await this.appRepository.findOne(id);

      await this.appRepository.delete(app);

      return app;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
