import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SavingDocCommand } from '../impl/saving-doc.command';
import { Logger, Inject } from '@nestjs/common';
import { SavedDocEvent } from '../../events/impl/saved-doc.event';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/services/prisma.service';

@CommandHandler(SavingDocCommand)
export class SavingDocHandler implements ICommandHandler<SavingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private eventBus: EventBus,
    @Inject('PUB_SUB') private readonly pubsub: PubSub,
    private prisma: PrismaService,
  ) {}

  async execute(command: SavingDocCommand) {
    this.logger.verbose('saving-doc.command');
    const { docId, actId } = command;

    try {
      this.eventBus.publish(new SavedDocEvent(docId));

      const doc = await this.prisma.doc.findOne({ where: { id: docId } });

      this.pubsub.publish(`Act_${actId}_added`, {
        changeDocs: { mutation: 'UPDATED', data: doc },
      });

      return doc;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
