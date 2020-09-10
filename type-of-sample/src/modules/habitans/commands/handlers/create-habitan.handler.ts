import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateHabitanCommand } from '../impl/create-habitan.command';
import { Logger } from '@nestjs/common';
import { Habitan } from 'src/modules/habitans/models/habitan.model';
import { HabitanRepository } from 'src/modules/habitans/habitan.repository';
import { HabitanCreatedEvent } from '../../events/impl/habitan-created.event';
import { HabitanService } from '../../habitan.service';

@CommandHandler(CreateHabitanCommand)
export class CreateHabitanHandler
  implements ICommandHandler<CreateHabitanCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly habitanService: HabitanService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateHabitanCommand): Promise<Habitan> {
    this.logger.verbose('create-habitan.command-handler');

    const { label } = command;

    try {
      const habitan = await this.habitanService.createHabitan(label);

      this.logger.verbose(habitan);

      this.eventBus.publish(new HabitanCreatedEvent(habitan));

      return habitan;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
