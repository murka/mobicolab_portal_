import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CeneralCustomerUpdatedEvent } from '../impl/gcustomer-updated.event';
import { EventRepository } from '../../general-customer.repository';

@EventsHandler(CeneralCustomerUpdatedEvent)
export class GeneralCustomerUpdatedHandler
  implements IEventHandler<CeneralCustomerUpdatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly eventRepository: EventRepository) {}

  async handle(event: CeneralCustomerUpdatedEvent) {
    this.logger.verbose('general-customer-updated.event');

    const { gcustomer } = event;

    try {
      const newEvent = this.eventRepository.create({
        general_customer: gcustomer,
        event_type: 'UPDATED',
        event_key: gcustomer.id,
        aggregateid: gcustomer.id,
        aggregateType: 'GeneralCustomer.' + 'UPDATED',
      });

      await this.eventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
