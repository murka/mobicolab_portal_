import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateLabCommand } from '../impl/create-lab.command';
import { Logger } from '@nestjs/common';
import { LabRepository } from '../../lab.repository';
import { Lab } from '../../models/lab.model';
import { LabCreatedEvent } from '../../events/impl/lab-created.event';

@CommandHandler(CreateLabCommand)
export class CreateLabHandler implements ICommandHandler<CreateLabCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly labRepository: LabRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateLabCommand): Promise<Lab> {
    this.logger.verbose('create-lab.command');

    const { data } = command;

    try {
      const lab = this.labRepository.create(data);

      await this.labRepository.save(lab);

      this.eventBus.publish(new LabCreatedEvent(lab));

      return lab
    } catch (e) {
      this.logger.error(e);
    }
  }
}
