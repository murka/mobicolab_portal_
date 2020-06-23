import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DroppedDocEvent } from '../impl/dropped-doc.event';
import { PrismaService } from 'src/services/prisma.service';
import { Logger } from '@nestjs/common';

@EventsHandler(DroppedDocEvent)
export class DroppedDocHandler implements IEventHandler<DroppedDocEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private prisma: PrismaService) {}

  async handle(event: DroppedDocEvent) {
    this.logger.verbose('dropped-doc.event');

    const { docId } = event;

    this.prisma.doc.update({
      where: { id: docId },
      data: { doc_event: { create: [{ event: 'DROPPED' }] } },
    });
    this.logger.verbose(`after update in "dropped event"`)
  }
}
