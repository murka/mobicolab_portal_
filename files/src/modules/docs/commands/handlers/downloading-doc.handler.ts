import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DownloadingDocCommand } from '../impl/downloading-doc.command';
import { Logger } from '@nestjs/common';
import { DocsService } from '../../docs.service';
import { ReadStream } from 'fs';
import { DocRepository } from '../../repositories/doc.repository';

@CommandHandler(DownloadingDocCommand)
export class DownloadingDocHandler
  implements ICommandHandler<DownloadingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private eventBus: EventBus,
    private ds: DocsService,
    private readonly docRepository: DocRepository,
  ) {}

  async execute(command: DownloadingDocCommand): Promise<void> {
    this.logger.verbose(`downloading-doc.command`);

    const { docId } = command;

    try {
      // const doc = await this.prisma.doc.findOne({ where: { id: docId } })

      const doc = await this.docRepository.findOne(docId);

      const filepaht = doc.ydUrl;
      const name = doc.name;

      //   return await this.ds.downloadFileFromYd(filepaht, name);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
