import {
  CommandHandler,
  ICommandHandler,
  CommandBus,
  EventBus,
} from '@nestjs/cqrs';
import { SavingDocCommand } from '../impl/saving-doc.command';
import { Logger } from '@nestjs/common';
import { DocsService } from '../../docs.service';
import { UploadDocCommand } from '../impl/upload-doc.command';
import { SavedDocEvent } from '../../events/impl/saved-doc.event';

@CommandHandler(SavingDocCommand)
export class SavingDocHandler implements ICommandHandler<SavingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly ds: DocsService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: SavingDocCommand) {
    this.logger.verbose('saving-doc.command');
    const { actId, docId, file } = command;

    try {
      const doc = await this.ds.getDoc(docId);

      const act = await this.ds.getAct(actId);

      doc.act = act;

      await this.ds.saveDoc(doc);

      this.commandBus.execute(new UploadDocCommand(actId, doc, file));

      return doc;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
