import { DownloadedDocEvent } from '../impl/downloaded-doc.event';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import {
  DocRepository,
  DocEventRepository,
} from '../../repositories/doc.repository';

@EventsHandler(DownloadedDocEvent)
export class DownloadedDocHandler implements IEventHandler<DownloadedDocEvent> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly docRepositroy: DocRepository,
    private readonly eventRepository: DocEventRepository,
  ) {}

  async handle(event: DownloadedDocEvent) {
    this.logger.verbose('downloaded-doc.event');

    const { docId } = event;

    try {
      // this.prisma.doc.update({
      //   where: { id: docId },
      //   data: { doc_event: { create: { event: 'DOWNLOADED' } } },
      // });

      const doc = await this.docRepositroy.findOne(docId);

      const newEvent = this.eventRepository.create({
        event: 'DOWNLOADED',
        doc: doc,
      });

      await this.eventRepository.save(newEvent);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
