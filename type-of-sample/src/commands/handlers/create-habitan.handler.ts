import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHabitanCommand } from '../impl/create-habitan.command';
import { Logger } from '@nestjs/common';
import { Habitan } from 'src/modules/type-of-sample/models/habitan.model';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';

@CommandHandler(CreateHabitanCommand)
export class CreateHabitanHandler
  implements ICommandHandler<CreateHabitanCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly habitanRepository: HabitanRepository) {}

  async execute(command: CreateHabitanCommand): Promise<Habitan> {
    this.logger.verbose('create-habitan.command-handler');

    const { label } = command;

    try {
      return await this.habitanRepository.newHabitan(label);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
