import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HabitanEventRepository } from '../../habitan.repository';
import { HabitanUpdatedEvent } from '../impl/habitan-updated.event';

@EventsHandler(HabitanUpdatedEvent)
export class HabitanUpdatedHandler
  implements IEventHandler<HabitanUpdatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly habitanEventRepository: HabitanEventRepository,
  ) {}

  async handle(event: HabitanUpdatedEvent) {
    this.logger.verbose('habitan-updated.event');

    const { habitan } = event;

    try {
      const newEvent = this.habitanEventRepository.create({
        habitan: habitan,
        event_type: 'UPDATED',
        event_key: habitan.id,
        aggregateType: 'Habitan.UPDATED',
        aggregateid: habitan.id,
      });

      await this.habitanEventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
