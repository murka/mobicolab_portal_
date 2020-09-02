import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SavedDocEvent } from '../impl/saved-doc.event';
import { Logger } from '@nestjs/common';
import {
  DocRepository,
  DocEventRepository,
} from '../../repositories/doc.repository';

@EventsHandler(SavedDocEvent)
export class SavedDocHadler implements IEventHandler<SavedDocEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly eventRepository: DocEventRepository) {}

  async handle(event: SavedDocEvent) {
    this.logger.verbose('saving-doc.event inside `evenbnHandler`');

    const { doc, aggregateType, aggregationId } = event;

    try {
      const newEvent = this.eventRepository.create({
        event_type: 'SAVED',
        payload: doc,
        aggregateType: aggregateType,
        aggregateid: aggregationId,
        event_key: doc.id,
      });

      this.logger.log(newEvent.aggregateType);

      await this.eventRepository.save(newEvent);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
