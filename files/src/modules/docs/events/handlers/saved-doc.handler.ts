import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SavedDocEvent } from '../impl/saved-doc.event';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@EventsHandler(SavedDocEvent)
export class SavedDocHadler implements IEventHandler<SavedDocEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private prisma: PrismaService) {}

  async handle(event: SavedDocEvent) {
    this.logger.verbose('saving-doc.event inside `evenbnHandler`');

    try {
      const { docId } = event;

      this.prisma.doc.update({
        where: { id: docId },
        data: { doc_event: { create: [{ event: 'SAVED' }] } },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
