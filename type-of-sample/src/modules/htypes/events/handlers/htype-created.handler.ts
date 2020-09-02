import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HTypeEventRepository } from '../../habitans-type.repository';
import { HTypeCreatedEvent } from '../impl/htype-created.event';

@EventsHandler(HTypeCreatedEvent)
export class HTypeCretedHandler implements IEventHandler<HTypeCreatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly htEventRepository: HTypeEventRepository) {}

  async handle(event: HTypeCreatedEvent) {
    this.logger.verbose('lab-updated.event');

    const { htype } = event;

    try {
      const newEvent = this.htEventRepository.create({
        htype: htype,
        event_type: 'CREATED',
        event_key: htype.id,
        aggregateType: 'HType.' + 'CREATED',
        aggregateid: htype.id,
      });

      await this.htEventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
