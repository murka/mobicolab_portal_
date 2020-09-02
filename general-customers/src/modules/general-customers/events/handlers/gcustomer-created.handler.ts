import { EventsHandler, IEventHandler, EventPublisher } from '@nestjs/cqrs';
import { GeneralCustomerCreatedEvent } from '../impl/gcustomer-created.event';
import { Logger } from '@nestjs/common';
import { EventRepository } from '../../general-customer.repository';

@EventsHandler(GeneralCustomerCreatedEvent)
export class GeneralCustomerCretedHandler
  implements IEventHandler<GeneralCustomerCreatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly eventRepository: EventRepository) {}

  async handle(event: GeneralCustomerCreatedEvent) {
    this.logger.verbose('gneral-customer-created.event');

    const { gcustomer } = event;

    try {
      const newEvent = this.eventRepository.create({
        general_customer: gcustomer,
        event_type: 'CREATED',
        event_key: gcustomer.id,
        aggregateid: gcustomer.id,
        aggregateType: 'GeneralCustomer.' + 'CREATED',
      });

      await this.eventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
