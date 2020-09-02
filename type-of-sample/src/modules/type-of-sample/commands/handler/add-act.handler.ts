import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddActCommand } from '../impl/add-act.command';
import { Logger } from '@nestjs/common';
import { ActService } from '../../act.service';

@CommandHandler(AddActCommand)
export class AddActHandler implements ICommandHandler<AddActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actService: ActService) {}

  async execute(command: AddActCommand): Promise<void> {
    this.logger.verbose('add-act.handler');

    const { actId, htypeId } = command;

    try {
      const act = await this.actService.createAct(actId);

      const htype = await this.actService.getHType(htypeId);

      const habitan = htype.habitan;

      act.habitan = habitan;
      act.htype = htype;

      this.actService.saveAct(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
