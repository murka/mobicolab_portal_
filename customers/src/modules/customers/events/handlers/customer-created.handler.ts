import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { EventRepository } from '../../customer.repository';
import { CustomerCreatedEvent } from '../impl/customer-created.event';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCretedHandler
  implements IEventHandler<CustomerCreatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly eventRepository: EventRepository) {}

  async handle(event: CustomerCreatedEvent) {
    this.logger.verbose('lab-created.event');

    const { customer } = event;

    try {
      const newEvent = this.eventRepository.create({
        customer: customer,
        event_type: 'CREATED',
        event_key: customer.id,
        aggregateType: 'Customer.' + 'CREATED',
        aggregateid: customer.id,
      });

      await this.eventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
