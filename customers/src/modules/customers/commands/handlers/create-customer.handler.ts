import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CustomerRepository } from '../../customer.repository';
import { Customer } from '../../models/customer.model';
import { CustomerCreatedEvent } from '../../events/impl/customer-created.event';
import { CreateCustomerCommand } from '../impl/create-lab.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    this.logger.verbose('create-lab.command');

    const { data } = command;

    try {
      const customer = this.customerRepository.create(data);

      await this.customerRepository.save(customer);

      this.eventBus.publish(new CustomerCreatedEvent(customer));

      return customer
    } catch (e) {
      this.logger.error(e);
    }
  }
}
