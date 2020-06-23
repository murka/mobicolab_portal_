import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveDocCommand } from '../impl/remove-doc.command';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { DocsService } from '../../docs.service';

@CommandHandler(RemoveDocCommand)
export class RemoveDocHandler implements ICommandHandler<RemoveDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private prisma: PrismaService, private ds: DocsService) {}

  async execute(command: RemoveDocCommand) {
    this.logger.verbose('remove-doc.command');
    const { docId } = command;
    try {
      const file = await this.prisma.doc.findOne({ where: { id: docId } })

      await this.ds.deleteFileFromYd(file.ydUrl, file.name)

      await this.prisma.doc_event.deleteMany({ where: { docId: docId } });

      const doc = await this.prisma.doc.delete({ where: { id: docId } });

      return doc;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
