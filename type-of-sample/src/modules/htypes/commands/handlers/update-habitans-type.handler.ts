import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateHabitansTypeCommand } from '../impl/update-habitans-type.command';
import { Logger } from '@nestjs/common';
import { HType } from 'src/modules/htypes/models/habitans-type.model';
import { HTypeUpdatedEvent } from '../../events/impl/htype-updated.event';
import { HTypeService } from '../../htype.service';

@CommandHandler(UpdateHabitansTypeCommand)
export class UpdateHabitansTypeHandler
  implements ICommandHandler<UpdateHabitansTypeCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly htypeService: HTypeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateHabitansTypeCommand): Promise<HType> {
    this.logger.verbose('create-habitan.command-handler');

    const { id, label } = command;

    try {
      const htype = await this.htypeService.updateHType(id, label);

      this.eventBus.publish(new HTypeUpdatedEvent(htype));

      return htype;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
