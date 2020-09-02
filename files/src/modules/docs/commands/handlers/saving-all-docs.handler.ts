import {
  CommandHandler,
  ICommandHandler,
  EventBus,
  CommandBus,
} from '@nestjs/cqrs';
import { SavingAllDocsCommand } from '../impl/saving-all-docs.command';
import { Logger } from '@nestjs/common';
import { Doc } from '../../models/doc.model';
import { SavingDocCommand } from '../impl/saving-doc.command';

@CommandHandler(SavingAllDocsCommand)
export class SavingAllDocsHandler
  implements ICommandHandler<SavingAllDocsCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: SavingAllDocsCommand): Promise<Doc[]> {
    this.logger.verbose('saving-all-docs.command');

    const { actId, docs } = command;

    try {
      const updatedDocs: Doc[] = [];

      for await (let doc of docs) {
        try {
          const upDoc: Doc = await this.commandBus.execute(
            new SavingDocCommand(actId, doc.docId, doc.file),
          );

          updatedDocs.push(upDoc);
        } catch (e) {
          this.logger.error(e);
        }
      }

      return updatedDocs;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
