import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SavedDocEvent } from '../impl/saved-doc.event';
import { Logger } from '@nestjs/common';
import {
  DocRepository,
  DocEventRepository,
} from '../../repositories/doc.repository';

@EventsHandler(SavedDocEvent)
export class SavedDocHadler implements IEventHandler<SavedDocEvent> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly docRepository: DocRepository,
    private readonly eventRepository: DocEventRepository,
  ) {}

  async handle(event: SavedDocEvent) {
    this.logger.verbose('saving-doc.event inside `evenbnHandler`');

    try {
      const { docId } = event;

      // this.prisma.doc.update({
      //   where: { id: docId },
      //   data: { doc_event: { create: [{ event: 'SAVED' }] } },
      // });

      const doc = await this.docRepository.findOne(docId);

      const newEvent = this.eventRepository.create({
        event: 'SAVED',
        doc: doc,
      });

      await this.eventRepository.save(newEvent);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
