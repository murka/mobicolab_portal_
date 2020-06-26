import {
  ICommandHandler,
  EventBus,
  CommandHandler,
} from '@nestjs/cqrs';
import { UploadDocCommand } from '../impl/upload-doc.command';
import { DocsService } from '../../docs.service';
import { PrismaService } from 'src/services/prisma.service';
import { Logger } from '@nestjs/common';
import { DocRepository, DocEventRepository } from '../../doc.repository';

@CommandHandler(UploadDocCommand)
export class UploadDocHandler implements ICommandHandler<UploadDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private docRepository: DocRepository,
    private evetRepositroy: DocEventRepository,
    private ds: DocsService,
  ) {}

  async execute(event: UploadDocCommand) {
    this.logger.verbose('create-path.command');
    try {
      const { actId, docId, file } = event;

      const path = await this.ds.createFilePath(actId);

      const doc = await this.docRepository.findOne(docId)

      doc.ydUrl = path

      await this.ds.uploadFileToYd(docId, file);

      doc.downloadable = true
      const docEvent = this.evetRepositroy.create({ event: 'UPLOADED', doc: doc })

      await this.evetRepositroy.save(docEvent)

    } catch (error) {
      this.logger.error(error);
    }
  }
}
