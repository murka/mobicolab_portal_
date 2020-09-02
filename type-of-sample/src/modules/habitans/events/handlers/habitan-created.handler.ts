import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HabitanCreatedEvent } from '../impl/habitan-created.event';
import { HabitanEventRepository } from '../../habitan.repository';

@EventsHandler(HabitanCreatedEvent)
export class HabitanCretedHandler
  implements IEventHandler<HabitanCreatedEvent> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly habitanEventRepository: HabitanEventRepository,
  ) {}

  async handle(event: HabitanCreatedEvent) {
    this.logger.verbose('habitan-create.event');

    const { habitan } = event;

    try {
      const newEvent = this.habitanEventRepository.create({
        habitan: habitan,
        event_type: 'CREATED',
        event_key: habitan.id,
        aggregateType: 'Habitan.CREATED',
        aggregateid: habitan.id,
      });

      await this.habitanEventRepository.save(newEvent);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
