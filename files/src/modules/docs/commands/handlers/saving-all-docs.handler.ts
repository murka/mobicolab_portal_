import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SavingAllDocsCommand } from '../impl/saving-all-docs.command';
import { Inject, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/services/prisma.service';
import { SavedDocEvent } from '../../events/impl/saved-doc.event';
import { Doc } from '../../models/doc.model';
import { DocsService } from '../../docs.service';

@CommandHandler(SavingAllDocsCommand)
export class SavingAllDocsHandler
  implements ICommandHandler<SavingAllDocsCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private eventBus: EventBus,
    private readonly ds: DocsService,
    private prisma: PrismaService,
  ) {}

  async execute(command: SavingAllDocsCommand): Promise<Doc[]> {
    this.logger.verbose('saving-all-docs.command')
    
    const { docs, actId } = command;

    try {
      const updatedDocs: Doc[] = [];

      for await (let docId of docs) {
        try {
          this.eventBus.publish(new SavedDocEvent(docId));

          const doc = await this.prisma.doc.findOne({ where: { id: docId } });
 
          updatedDocs.push(doc);
        } catch (e) {
          this.logger.error(e);
        }
      }
      const docsId = updatedDocs.map(doc => doc.id)

      await this.ds.publishDocs(docsId, actId, 'UPDATED')

      return updatedDocs
    } catch (e) {
      this.logger.error(e);
    }
  }
}
