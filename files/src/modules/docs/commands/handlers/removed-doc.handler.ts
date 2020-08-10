import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveDocCommand } from '../impl/remove-doc.command';
import { Logger } from '@nestjs/common';
import { DocsService } from '../../docs.service';
import { DocRepository } from '../../repositories/doc.repository';

@CommandHandler(RemoveDocCommand)
export class RemoveDocHandler implements ICommandHandler<RemoveDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private ds: DocsService,
    private readonly docRepository: DocRepository,
  ) {}

  async execute(command: RemoveDocCommand) {
    this.logger.verbose('remove-doc.command');
    const { docId } = command;
    try {
      // const file = await this.prisma.doc.findOne({ where: { id: docId } })

      const doc = await this.docRepository.findOne(docId);

      await this.ds.deleteFileFromYd(doc.ydUrl, doc.name);

      // await this.prisma.doc_event.deleteMany({ where: { docId: docId } });

      // const doc = await this.prisma.doc.delete({ where: { id: docId } });

      await this.docRepository.delete(doc);

      return doc;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
