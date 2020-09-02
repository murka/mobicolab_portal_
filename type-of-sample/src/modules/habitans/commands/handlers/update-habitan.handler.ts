import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateHabitanCommand } from '../impl/update-habitan.command';
import { Habitan } from 'src/modules/habitans/models/habitan.model';
import { Logger } from '@nestjs/common';
import { HabitanUpdatedEvent } from '../../events/impl/habitan-updated.event';
import { HabitanService } from '../../habitan.service';

@CommandHandler(UpdateHabitanCommand)
export class UpdateHabitanHandler
  implements ICommandHandler<UpdateHabitanCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly habitanService: HabitanService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateHabitanCommand): Promise<Habitan> {
    this.logger.verbose('update-habitan.command-handler');

    const { id, label } = command;

    try {
      const habitan = await this.habitanService.updateHabitan(id, label);

      this.eventBus.publish(new HabitanUpdatedEvent(habitan));

      return habitan;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
