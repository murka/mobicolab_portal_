import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateActByHabitanCommand } from './commands/impl/update-act-by-habitan.command';

@Controller('habitans')
export class HabitansController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly commandBus: CommandBus) {}

  //   @EventPattern('outbox.event.ACT.Habitan.CREATED')
  //   async handlerNewAct(@Payload() message: any): Promise<void> {
  //     this.logger.verbose(`handler-new-act ${JSON.stringify(message, null, 2)}`);

  //     const {
  //       value: { payload: actId },
  //       key: { payload: habitanId },
  //     } = message;

  //     try {
  //       await this.commandBus.execute(new AddActCommand(actId, habitanId));
  //     } catch (error) {
  //       this.logger.error(error.message);
  //     }
  //   }

  @EventPattern('outbox.event.ACT.Habitan.UPDATED')
  async handlerUpdateAct(@Payload() message: any): Promise<void> {
    this.logger.verbose(
      `hanler-update-act ${JSON.stringify(message, null, 2)}`,
    );

    const {
      value: { payload: actId },
      key: { payload: habitanId },
    } = message;

    try {
      await this.commandBus.execute(
        new UpdateActByHabitanCommand(actId, habitanId),
      );
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
