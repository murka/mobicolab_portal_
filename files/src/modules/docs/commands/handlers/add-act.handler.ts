import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddActCommand } from '../impl/add-act.command';
import { DocsService } from '../../docs.service';
import { Logger } from '@nestjs/common';

@CommandHandler(AddActCommand)
export class AddActHandler implements ICommandHandler<AddActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly ds: DocsService) {}

  async execute(command: AddActCommand): Promise<void> {
    this.logger.verbose('add-act.handler');

    const { actId } = command;

    try {
      this.ds.addNewAct(actId);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
