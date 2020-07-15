import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SavingDocCommand } from '../impl/saving-doc.command';
import { Logger } from '@nestjs/common';
import { SavedDocEvent } from '../../events/impl/saved-doc.event';
import { DocsService } from '../../docs.service';
import { DocRepository } from '../../doc.repository';

@CommandHandler(SavingDocCommand)
export class SavingDocHandler implements ICommandHandler<SavingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private eventBus: EventBus,
    private readonly ds: DocsService,
    private readonly docRepository: DocRepository
  ) {}

  async execute(command: SavingDocCommand) {
    this.logger.verbose('saving-doc.command');
    const { docId, actId } = command;

    try {
      this.eventBus.publish(new SavedDocEvent(docId));

      // const doc = await this.prisma.doc.findOne({ where: { id: docId } });

      const doc = await this.docRepository.findOne(docId)

      await this.ds.publishDoc(doc.id, actId, 'UPDATED')

      return doc;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
