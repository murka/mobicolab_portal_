import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateActByHTypeCommand } from '../impl/update-act-by-htype.command';
import { Logger } from '@nestjs/common';
import { HTypeService } from '../../htype.service';

@CommandHandler(UpdateActByHTypeCommand)
export class UpdateActByHTypeHandler
  implements ICommandHandler<UpdateActByHTypeCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly htypeService: HTypeService) {}

  async execute(command: UpdateActByHTypeCommand): Promise<void> {
    this.logger.verbose('update-act.handler');

    const { actId, htypeId } = command;

    try {
      const act = await this.htypeService.getAct(actId);

      const htype = await this.htypeService.getHType(htypeId);

      act.htype = htype;

      this.htypeService.saveAct(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
