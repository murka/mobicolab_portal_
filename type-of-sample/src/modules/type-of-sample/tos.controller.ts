import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { AddActCommand } from './commands/impl/add-act.command';

@Controller('tos')
export class TypeOfSampleController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern('outbox.event.ACT.TOS.CREATED')
  handlerCreateAct(@Payload() message: any): void {
    this.logger.verbose('handler-create-act');

    const {
      value: { payload: actId },
      key: { payload: htypeId },
    } = message;

    try {
      this.commandBus.execute(new AddActCommand(actId, htypeId));
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
