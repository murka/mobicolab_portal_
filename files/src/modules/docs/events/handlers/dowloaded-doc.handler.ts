import { DownloadedDocEvent } from '../impl/downloaded-doc.event';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@EventsHandler(DownloadedDocEvent)
export class DownloadedDocHandler implements IEventHandler<DownloadedDocEvent> {
  logger = new Logger(this.constructor.name);

  constructor(private prisma: PrismaService) {}

  async handle(event: DownloadedDocEvent) {
    this.logger.verbose('downloaded-doc.event');

    const { docId } = event;

    this.prisma.doc.update({
      where: { id: docId },
      data: { doc_event: { create: { event: 'DOWNLOADED' } } },
    });
  }
}
