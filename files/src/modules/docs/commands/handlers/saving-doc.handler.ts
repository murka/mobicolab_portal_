import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SavingDocCommand } from '../impl/saving-doc.command';
import { Logger, Inject } from '@nestjs/common';
import { SavedDocEvent } from '../../events/impl/saved-doc.event';
import { PrismaService } from 'src/services/prisma.service';
import { DocsService } from '../../docs.service';

@CommandHandler(SavingDocCommand)
export class SavingDocHandler implements ICommandHandler<SavingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private eventBus: EventBus,
    private prisma: PrismaService,
    private readonly ds: DocsService,
  ) {}

  async execute(command: SavingDocCommand) {
    this.logger.verbose('saving-doc.command');
    const { docId, actId } = command;

    try {
      this.eventBus.publish(new SavedDocEvent(docId));

      const doc = await this.prisma.doc.findOne({ where: { id: docId } });

      await this.ds.publishDoc(doc.id, actId, 'UPDATED')

      return doc;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
