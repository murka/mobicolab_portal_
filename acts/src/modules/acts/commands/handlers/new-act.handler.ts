import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs'
import { NewActCommand } from '../impl/new-act.command';
import { Act } from '../../models/act.model';
import { Logger } from '@nestjs/common';
import { ActCreatedEvent } from '../../events/impl/act-created.event'
import { ActRepository } from '../../act.repository';

@CommandHandler(NewActCommand)
export class NewActHandler implements ICommandHandler<NewActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private eventBus: EventBus,
  ) {}

  async execute(command: NewActCommand): Promise<Act> {
    this.logger.verbose(`new-act.command`);

    const { newActData } = command;

    try {
      const newAct = await this.actRepository.create(newActData).save()

      this.eventBus.publish(new ActCreatedEvent(newAct.id));

      return newAct;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
