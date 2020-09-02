import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ActUpdatedEvent } from '../impl/act-updated.event';
import { Logger } from '@nestjs/common';
import { ActRepository } from '../../repositories/act.repository';
import { EventRepository } from '../../repositories/evetns.repository';

@EventsHandler(ActUpdatedEvent)
export class ActUpdatedHandler implements IEventHandler<ActUpdatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly eventRepositroy: EventRepository,
  ) {}

  async handle(event: ActUpdatedEvent): Promise<void> {
    this.logger.verbose('act-updeted.event');

    const { act, aggregateType, aggregationId } = event;

    try {
      const event = this.eventRepositroy.create({
        event_type: 'UPDATED',
        act: act,
        aggregateid: aggregationId,
        aggregateType: aggregateType + '.UPDATED',
        event_key: act.id,
      });

      await this.eventRepositroy.save(event);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
