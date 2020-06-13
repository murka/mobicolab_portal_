import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SavingAllDocsCommand } from '../impl/saving-all-docs.command';
import { Inject, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/services/prisma.service';
import { SavedDocEvent } from '../../events/impl/saved-doc.event';
import { Doc } from '../../models/doc.model';

@CommandHandler(SavingAllDocsCommand)
export class SavingAllDocsHandler
  implements ICommandHandler<SavingAllDocsCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private eventBus: EventBus,
    @Inject('PUB_SUB') private readonly pubsub: PubSub,
    private prisma: PrismaService,
  ) {}

  async execute(command: SavingAllDocsCommand): Promise<Doc[]> {
    this.logger.verbose('saving-all-docs.command')
    
    const { docs, actId } = command;

    try {
      const updatedDocs: any[] = [];
      for await (let docId of docs) {
        try {
          this.eventBus.publish(new SavedDocEvent(docId));

          const doc = await this.prisma.doc.findOne({ where: { id: docId } });

          this.pubsub.publish(`Act_${actId}_added`, {
            changeDocs: { mutation: 'UPDATED', data: doc },
          });
          updatedDocs.push(doc);
        } catch (e) {
          this.logger.error(e);
        }
      }
      return updatedDocs
    } catch (e) {
      this.logger.error(e);
    }
  }
}
