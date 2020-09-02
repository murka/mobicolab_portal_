import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HTypeUpdatedEvent } from '../impl/htype-updated.event';
import { HTypeEventRepository } from '../../habitans-type.repository';

@EventsHandler(HTypeUpdatedEvent)
export class HTypeUpdatedHandler implements IEventHandler<HTypeUpdatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly htEventRepository: HTypeEventRepository) {}

  async handle(event: HTypeUpdatedEvent) {
    this.logger.verbose('lab-updated.event');

    const { hytpe } = event;

    try {
      const newEvent = this.htEventRepository.create({
        htype: hytpe,
        event_type: 'UPDATED',
        event_key: hytpe.id,
        aggregateType: 'HType.' + 'UPDATED',
        aggregateid: hytpe.id,
      });

      await this.htEventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
