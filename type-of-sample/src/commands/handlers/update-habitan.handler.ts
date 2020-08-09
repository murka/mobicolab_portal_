import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHabitanCommand } from '../impl/update-habitan.command';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
import { Habitan } from 'src/modules/type-of-sample/models/habitan.model';
import { Logger } from '@nestjs/common';

@CommandHandler(UpdateHabitanCommand)
export class UpdateHabitanHandler
  implements ICommandHandler<UpdateHabitanCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly habitanRepository: HabitanRepository) {}

  async execute(command: UpdateHabitanCommand): Promise<Habitan> {
    this.logger.verbose('create-habitan.command-handler');

    const { id, label } = command;

    try {
      return await this.habitanRepository.updateHabitan(id, label);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
