import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DocsService } from '../../docs.service';
import { Logger } from '@nestjs/common';
import { RemoveDocCommand } from '../impl/remove-doc.command';

@CommandHandler(RemoveDocCommand)
export class RemoveDocHandler implements ICommandHandler<RemoveDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly ds: DocsService) {}

  async execute(command: RemoveDocCommand): Promise<void> {
    this.logger.verbose('remove-doc.handler');

    const { docId } = command;

    try {
      this.ds.deleteDoc(docId);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
