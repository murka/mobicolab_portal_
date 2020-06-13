import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../impl/update-customer.command';
import { Logger } from '@nestjs/common';
import { CustomerRepository } from '../../customer.repository';
import { Customer } from '../../models/customer.model';
import { CustomerUpdatedEvent } from '../../events/impl/customer-updated.event';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    this.logger.verbose('update-lab.command');

    const { data } = command;

    try {
      const customer = await this.customerRepository.findOne(data.id);

      await this.customerRepository.update(customer, data);

      this.eventBus.publish(new CustomerUpdatedEvent(customer));

      return customer;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
