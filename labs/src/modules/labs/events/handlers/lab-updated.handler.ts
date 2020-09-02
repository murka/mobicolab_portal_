import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LabUpdatedEvent } from '../impl/lab-updated.event';
import { Logger } from '@nestjs/common';
import { EventRepository } from '../../lab.repository';

@EventsHandler(LabUpdatedEvent)
export class LabUpdatedHandler implements IEventHandler<LabUpdatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly eventRepository: EventRepository) {}

  async handle(event: LabUpdatedEvent) {
    this.logger.verbose('lab-updated.event');

    const { lab } = event;

    try {
      const newEvent = this.eventRepository.create({
        event_key: lab.id,
        event_type: 'UPDATED',
        aggregateType: 'Lab.' + 'UPDATED',
        aggregateid: lab.id,
      });

      await this.eventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
