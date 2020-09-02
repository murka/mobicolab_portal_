import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HabitanRepository } from 'src/modules/habitans/habitan.repository';
import { HabitansTypeRepository } from 'src/modules/htypes/habitans-type.repository';
import { HType } from 'src/modules/htypes/models/habitans-type.model';
import { CreateHabitansTypeCommand } from '../impl/create-habitans-type.command';
import { HTypeCreatedEvent } from '../../events/impl/htype-created.event';
import { HTypeService } from '../../htype.service';

@CommandHandler(CreateHabitansTypeCommand)
export class CreateHabitansTypeHandler
  implements ICommandHandler<CreateHabitansTypeCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly htypeService: HTypeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateHabitansTypeCommand): Promise<HType> {
    this.logger.verbose('create-habitan.command-handler');

    const { id, label } = command;

    try {
      const habitan = await this.htypeService.getHabitan(id);

      const htype = await this.htypeService.createHType(label);

      htype.habitan = habitan;

      this.eventBus.publish(new HTypeCreatedEvent(htype));

      return await this.htypeService.saveHType(htype);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
