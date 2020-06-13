import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CustomerUpdatedEvent } from '../impl/customer-updated.event';
import { EventRepository } from '../../customer.repository';

@EventsHandler(CustomerUpdatedEvent)
export class CustomerUpdatedHandler implements IEventHandler<CustomerUpdatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly eventRepository: EventRepository) {}

  async handle(event: CustomerUpdatedEvent) {
    this.logger.verbose('lab-updated.event');

    const { customer } = event;

    try {
      const newEvent = this.eventRepository.create({
        customer: customer,
        event: 'UPDATED',
      });

      await this.eventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
