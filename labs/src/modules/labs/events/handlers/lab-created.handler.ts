import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LabCreatedEvent } from '../impl/lab-created.event';
import { Logger } from '@nestjs/common';
import { EventRepository } from '../../lab.repository';

@EventsHandler(LabCreatedEvent)
export class LabCretedHandler implements IEventHandler<LabCreatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly eventRepository: EventRepository) {}

  async handle(event: LabCreatedEvent) {
    this.logger.verbose('lab-created.event');

    const { lab } = event;

    try {
      const newEvent = this.eventRepository.create({ event: 'CREATED' });

      newEvent.lab = lab;

      await this.eventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
