import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletingDocCommand } from '../impl/deleting-doc.command';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { DocsService } from '../../docs.service';

@CommandHandler(DeletingDocCommand)
export class DeletingDocHandler implements ICommandHandler<DeletingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private prisma: PrismaService,
    private ds: DocsService,
  ) {}

  async execute(command: DeletingDocCommand): Promise<any> {
    this.logger.verbose('deleting-doc.command');

    const { docId, actId } = command;

    try {
      const file = await this.prisma.doc.findOne({ where: { id: docId } });

      await this.ds.deleteFileFromYd(file.ydUrl, file.name);

      await this.prisma.doc_event.deleteMany({ where: { docId: docId } });

      const doc = await this.prisma.doc.delete({ where: { id: docId, } });

      await this.ds.publishDoc(doc.id, actId, 'DELETED')

      return doc;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
