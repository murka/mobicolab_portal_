import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { UploadDocCommand } from '../impl/upload-doc.command';
import { DocsService } from '../../docs.service';
import { Logger } from '@nestjs/common';
import { SavedDocEvent } from '../../events/impl/saved-doc.event';

@CommandHandler(UploadDocCommand)
export class UploadDocHandler implements ICommandHandler<UploadDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private ds: DocsService, private readonly eventBus: EventBus) {}

  async execute(command: UploadDocCommand) {
    this.logger.verbose('create-path.command');

    const { actId, doc, file } = command;

    try {
      const path = await this.ds.createFilePath(actId);

      doc.ydUrl = path;

      await this.ds.saveDoc(doc);

      this.eventBus.publish(new SavedDocEvent(doc, doc.title, actId));

      await this.ds.uploadFileToYd(file, path, doc.name);
    } catch (error) {
      this.logger.error(JSON.stringify(error.message, null, 2));
    }
  }
}
