import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateActByHTypeCommand } from './commands/impl/update-act-by-htype.command';

@Controller('htypes')
export class HtypesController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly commandBus: CommandBus) {}

  // @EventPattern('outbox.event.ACT.HType.CREATED')
  // async handlerNewAct(@Payload() message: any): Promise<void> {
  //   this.logger.verbose(`hanler-new-act ${JSON.stringify(message, null, 2)}`);
  // }

  @EventPattern('outbox.event.ACT.HType.UPDATED')
  async handlerUpdateAct(@Payload() message: any): Promise<void> {
    this.logger.verbose(
      `handler-update-act ${JSON.stringify(message, null, 2)}`,
    );

    const {
      value: { payload: actId },
      key: { payload: htypeId },
    } = message;

    this.logger.log(`${actId}, ${htypeId}`);

    try {
      this.commandBus.execute(new UpdateActByHTypeCommand(actId, htypeId));
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
