import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NewActCommand } from '../impl/new-act.command';
import { Act } from '../../models/act.model';
import { Logger } from '@nestjs/common';
import { ActCreatedEvent } from '../../events/impl/act-created.event';
import { ActRepository } from '../../act.repository';
import { ActsService } from '../../acts.service';

@CommandHandler(NewActCommand)
export class NewActHandler implements ICommandHandler<NewActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly as: ActsService,
    private eventBus: EventBus,
  ) {}

  async execute(command: NewActCommand): Promise<Act> {
    this.logger.verbose(`new-act.command`);

    const { newActData } = command;

    try {
      const { customer, gcustomer, lab } = await this.as.getContractors(
        newActData.customer,
        newActData.general_customer,
        newActData.lab,
      );

      const newAct = this.actRepository.create({
        ...newActData,
        customer: customer,
        general_customer: gcustomer,
        lab: lab,
      });

      this.eventBus.publish(new ActCreatedEvent(newAct.id));

      return await this.actRepository.save(newAct);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
