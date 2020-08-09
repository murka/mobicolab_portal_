import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
import { HabitansTypeRepository } from 'src/modules/type-of-sample/repositories/habitans-type.repository';
import { HabitansType } from 'src/modules/type-of-sample/models/habitans-type.model';
import { CreateHabitansTypeCommand } from '../impl/create-habitans-type.command';

@CommandHandler(CreateHabitansTypeCommand)
export class CreateHabitansTypeHandler
  implements ICommandHandler<CreateHabitansTypeCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly habitanRepository: HabitanRepository,
    private readonly htRepository: HabitansTypeRepository,
  ) {}

  async execute(command: CreateHabitansTypeCommand): Promise<HabitansType> {
    this.logger.verbose('create-habitan.command-handler');

    const { id, label } = command;

    try {
      const habitan = await this.habitanRepository.findOne(id);

      const htype = await this.htRepository.createHabitansType(label);

      htype.habitan = habitan;

      return await this.htRepository.save(htype);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
