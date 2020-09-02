import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TitlingDocCommand } from '../impl/titling-doc.command';
import { Logger } from '@nestjs/common';
import { DocsService } from '../../docs.service';

@CommandHandler(TitlingDocCommand)
export class TitlingDocHandler implements ICommandHandler<TitlingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly docService: DocsService) {}

  async execute(command: TitlingDocCommand): Promise<any> {
    this.logger.verbose('titling-doc.command');

    const { actId, docId, name, mimtype, title } = command;

    try {
      const doc = await this.docService.getDoc(docId);

      doc.name = await this.docService.createName(actId, title, name, mimtype);

      doc.title = title;

      return await this.docService.saveDoc(doc);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
