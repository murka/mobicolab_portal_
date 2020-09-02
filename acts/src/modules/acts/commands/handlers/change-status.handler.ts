import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ActsService } from '../../acts.service';
import { ChangeStatusCommand } from '../impl/change-status.command';
import { ActStatus } from '../../models/act-status.model';

@CommandHandler(ChangeStatusCommand)
export class ChangeStatusHandler
  implements ICommandHandler<ChangeStatusCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actService: ActsService) {}

  async execute(command: ChangeStatusCommand) {
    this.logger.verbose('change-status.handler');

    const { actId, status } = command;

    try {
      const act = await this.actService.findAct(actId);

      switch (status) {
        case 'ACT':
          act.status = ActStatus.REGISTERED;
          break;
        case 'PROTOCOL':
          act.status = ActStatus.PROTOCOL;
          break;
        case 'FINAL_PROTOCOL':
          act.status = ActStatus.FULL;
          break;
        default:
          break;
      }

      await this.actService.saveAct(act);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
