import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ActCreatedEvent } from '../impl/act-created.event';
import { Logger } from '@nestjs/common';
import { EventRepository } from '../../repositories/evetns.repository';

@EventsHandler(ActCreatedEvent)
export class ActCreatedHandler implements IEventHandler<ActCreatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actEventRepository: EventRepository) {}

  async handle(event: ActCreatedEvent) {
    this.logger.verbose('act-created.event');

    const { act, aggregateType, aggregationId } = event;

    this.logger.log(`act-id ${act.id}`);
    this.logger.log(`consumer ${aggregateType}, ${aggregationId}`);

    try {
      const newEvent = this.actEventRepository.create({
        event_type: 'CREATED',
        act: act,
        aggregateType: aggregateType + '.CREATED',
        aggregateid: aggregationId,
        event_key: act.id,
      });

      await this.actEventRepository.save(newEvent);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
