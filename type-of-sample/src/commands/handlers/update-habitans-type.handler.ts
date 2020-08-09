import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHabitansTypeCommand } from '../impl/update-habitans-type.command';
import { Logger } from '@nestjs/common';
import { HabitansType } from 'src/modules/type-of-sample/models/habitans-type.model';
import { HabitansTypeRepository } from 'src/modules/type-of-sample/repositories/habitans-type.repository';

@CommandHandler(UpdateHabitansTypeCommand)
export class UpdateHabitansTypeHandler
  implements ICommandHandler<UpdateHabitansTypeCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly htRepository: HabitansTypeRepository) {}

  async execute(command: UpdateHabitansTypeCommand): Promise<HabitansType> {
    this.logger.verbose('create-habitan.command-handler');

    const { id, label } = command;

    try {
      return await this.htRepository.updateHabitansType(id, label);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
