import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PushDocByTypeCommand } from '../impl/push-doc-by-type.command';
import { Logger } from '@nestjs/common';
import { DocsService } from '../../docs.service';
import { Doc } from 'src/models/build/files/files';

@CommandHandler(PushDocByTypeCommand)
export class PushDocByTypeHandler
  implements ICommandHandler<PushDocByTypeCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly docService: DocsService) {}

  async execute(command: PushDocByTypeCommand): Promise<void> {
    this.logger.verbose('push-doc-by-type.handler');

    const { actId, type } = command;

    try {
      const doc = await this.docService.getDocByType(actId, type);

      if (doc) {
        this.docService.docSubject.next(doc as Doc);
      }
      this.docService.docSubject.complete();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
