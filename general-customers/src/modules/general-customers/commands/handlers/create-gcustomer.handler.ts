import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateGeneralCustomerCommand } from '../impl/create-gcustomer.command';
import { GeneralCustomer } from '../../models/general-customer.model';
import { GeneralCustomerCreatedEvent } from '../../events/impl/gcustomer-created.event';
import { GeneralCustomerRepository } from '../../general-customer.repository';

@CommandHandler(CreateGeneralCustomerCommand)
export class CreateGeneralCustomerHandler implements ICommandHandler<CreateGeneralCustomerCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly gsRepository: GeneralCustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateGeneralCustomerCommand): Promise<GeneralCustomer> {
    this.logger.verbose('create-general-customer.command');

    const { data } = command;

    try {
      const gs = this.gsRepository.create(data);

      await this.gsRepository.save(gs);

      this.eventBus.publish(new GeneralCustomerCreatedEvent(gs));

      return gs
    } catch (e) {
      this.logger.error(e);
    }
  }
}
