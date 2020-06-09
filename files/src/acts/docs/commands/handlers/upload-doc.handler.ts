import {
  ICommandHandler,
  EventBus,
  CommandHandler,
} from '@nestjs/cqrs';
import { UploadDocCommand } from '../impl/upload-doc.command';
import { DocsService } from '../../docs.service';
import { PrismaService } from 'src/services/prisma.service';
import { Logger } from '@nestjs/common';

@CommandHandler(UploadDocCommand)
export class UploadDocHandler implements ICommandHandler<UploadDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private prisma: PrismaService,
    private ds: DocsService,
  ) {}

  async execute(event: UploadDocCommand) {
    this.logger.verbose('create-path.command');
    try {
      const { actId, docId, file } = event;

      const path = await this.ds.createFilePath(actId);

      await this.prisma.doc.update({
        where: { id: docId },
        data: { ydUrl: path },
      });

      await this.ds.uploadFileToYd(docId, file);

      await this.prisma.doc.update({
        where: { id: docId },
        data: {downloadable: true, doc_event: { create: { event: 'UPLOADED' } } },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
