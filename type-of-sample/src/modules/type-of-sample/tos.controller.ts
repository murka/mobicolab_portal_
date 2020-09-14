import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { AddActCommand } from './commands/impl/add-act.command';
import {
  TOSServiceControllerMethods,
  TOSServiceController,
  Ids,
  Tos,
} from '../../models/build/tos/tos';
import { ActService } from './act.service';

@Controller('tos')
@TOSServiceControllerMethods()
export class TypeOfSampleController implements TOSServiceController {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly actService: ActService,
  ) {}

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

  async getTOS(data: Ids): Promise<Tos> {
    this.logger.verbose('get-tos.grpc');

    try {
      const htype = await this.actService.getHType(data.htypeId);

      const habitan = htype.habitan.label;

      return { habitan, htype: htype.label } as Tos;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
