import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletingDocCommand } from '../impl/deleting-doc.command';
import { Logger, Inject } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { DocsService } from '../../docs.service';
import { PubSub } from 'graphql-subscriptions';
import { Doc } from 'src/acts/docs/models/doc.model';

@CommandHandler(DeletingDocCommand)
export class DeletingDocHandler implements ICommandHandler<DeletingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private prisma: PrismaService,
    private ds: DocsService,
    @Inject('PUB_SUB') private readonly pubsub: PubSub,
  ) {}

  async execute(command: DeletingDocCommand): Promise<any> {
    this.logger.verbose('deleting-doc.command');

    const { docId, actId } = command;

    try {
      const file = await this.prisma.doc.findOne({ where: { id: docId } });

      await this.ds.deleteFileFromYd(file.ydUrl, file.name);

      await this.prisma.doc_event.deleteMany({ where: { docId: docId } });

      const doc = await this.prisma.doc.delete({ where: { id: docId, } });

      this.pubsub.publish(`Act_${actId}_added`, {
        changeDocs: { mutation: 'DELETED', data: doc },
      });

      return doc;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
