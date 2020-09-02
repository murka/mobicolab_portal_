import { UpdateActByHabitanCommand } from '../impl/update-act-by-habitan.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HabitanService } from '../../habitan.service';

@CommandHandler(UpdateActByHabitanCommand)
export class UpdateActByHabitanHandler
  implements ICommandHandler<UpdateActByHabitanCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly habitanService: HabitanService) {}

  async execute(command: UpdateActByHabitanCommand): Promise<void> {
    this.logger.verbose('update-act.handler');

    const { actId, habitanId } = command;

    try {
      const act = await this.habitanService.getAct(actId);

      const habitan = await this.habitanService.getHabitan(habitanId);

      act.habitan = habitan;

      this.habitanService.saveAct(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
