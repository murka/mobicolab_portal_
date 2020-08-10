import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TitlingDocCommand } from '../impl/titling-doc.command';
import { Logger } from '@nestjs/common';
import {
  DocRepository,
  DocEventRepository,
} from '../../repositories/doc.repository';

@CommandHandler(TitlingDocCommand)
export class TitlingDocHandler implements ICommandHandler<TitlingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly docRepository: DocRepository,
    private readonly docEventRepository: DocEventRepository,
  ) {}

  async execute(command: TitlingDocCommand): Promise<any> {
    this.logger.verbose('titling-doc.command');

    const { docId, title } = command;

    try {
      // const doc = await this.prisma.doc.update({
      //   where: { id: docId },
      //   data: { title: title, doc_event: { create: [{ event: 'TITLED' }] } },
      // });

      const doc = await this.docRepository.findOne(docId);

      await this.docRepository.update(doc, { title: title });

      const newEvent = this.docEventRepository.create({
        event: 'TITLED',
        doc: doc,
      });

      await this.docEventRepository.save(newEvent);

      return doc;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
