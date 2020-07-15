import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DroppedDocEvent } from '../impl/dropped-doc.event';
import { Logger } from '@nestjs/common';
import { DocRepository, DocEventRepository } from '../../doc.repository';

@EventsHandler(DroppedDocEvent)
export class DroppedDocHandler implements IEventHandler<DroppedDocEvent> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly docRepositroy: DocRepository,
    private readonly eventRepository: DocEventRepository,
  ) {}

  async handle(event: DroppedDocEvent) {
    this.logger.verbose('dropped-doc.event');

    const { docId } = event;

    try {
      // await this.prisma.doc.update({
      //   where: { id: docId },
      //   data: { doc_event: { create: [{ event: 'DROPPED' }] } },
      // });

      const doc = await this.docRepositroy.findOne(docId)

      const newEvent = this.eventRepository.create({ event: 'DROPPED', doc: doc })

      await this.eventRepository.save(newEvent)

      this.logger.verbose(`after update in "dropped event"`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
