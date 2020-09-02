import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { DroppingDocCommand } from '../impl/dropping-doc.command';
import { Logger } from '@nestjs/common';
import { Doc } from '../../models/doc.model';
import { DocRepository } from '../../repositories/doc.repository';
import { UploadDocCommand } from '../impl/upload-doc.command';
import { DocsService } from '../../docs.service';

@CommandHandler(DroppingDocCommand)
export class DroppingDocHandler implements ICommandHandler<DroppingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private docRepositroy: DocRepository,
    private readonly commandBus: CommandBus,
    private readonly docService: DocsService,
  ) {}

  async execute(command: DroppingDocCommand): Promise<Doc> {
    this.logger.verbose('dorpping-doc.handler');

    const { file, actId, name, title, mimtype } = command;

    try {
      this.logger.verbose('dropping-doc.command');

      const doc = this.docRepositroy.create();

      if (file) {
        doc.name = await this.docService.createName(
          actId,
          title,
          name,
          mimtype,
        );
        doc.title = title;
      }

      await this.docRepositroy.save(doc);

      if (file) {
        this.commandBus.execute(new UploadDocCommand(actId, doc, file));
      }

      return doc;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
