import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletingDocCommand } from '../impl/deleting-doc.command';
import { Logger } from '@nestjs/common';
import { DocsService } from '../../docs.service';
import { DocRepository } from '../../repositories/doc.repository';

@CommandHandler(DeletingDocCommand)
export class DeletingDocHandler implements ICommandHandler<DeletingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly docRepository: DocRepository,
    private ds: DocsService,
  ) {}

  async execute(command: DeletingDocCommand): Promise<any> {
    this.logger.verbose('deleting-doc.command');

    const { docId, actId } = command;

    try {
      // const file = await this.prisma.doc.findOne({ where: { id: docId } });

      const doc = await this.docRepository.findOne(docId);

      await this.ds.deleteFileFromYd(doc.ydUrl, doc.name);

      // await this.prisma.doc_event.deleteMany({ where: { docId: docId } });

      // const doc = await this.prisma.doc.delete({ where: { id: docId, } });

      await this.docRepository.delete(doc);

      await this.ds.publishDoc(doc.id, actId, 'DELETED');

      return doc;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
