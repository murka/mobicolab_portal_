import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  LabServiceControllerMethods,
  LabServiceController,
  labId,
  Lab,
  Label,
} from 'src/models/build/lab/lab';
import { Lab as LabModel } from './models/lab.model';
import { GetLabQuery } from './queries/impl/get-lab.query';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AddActCommand } from './commands/impl/add-act.command';
import { UpdateActCommand } from './commands/impl/update-act.command';

@Controller('labs')
@LabServiceControllerMethods()
export class LabsController implements LabServiceController {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @EventPattern('outbox.event.ACT.Lab.CREATED')
  async handlerNewAct(@Payload() message: any): Promise<void> {
    this.logger.verbose(`handler-new-act ${JSON.stringify(message, null, 2)}`);

    const {
      value: { payload: actId },
      key: { payload: labId },
    } = message;

    try {
      await this.commandBus.execute(new AddActCommand({ actId, labId }));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @EventPattern('outbox.event.ACT.Lab.UPDATED')
  async handlerUpdateAct(@Payload() message: any): Promise<void> {
    this.logger.verbose(
      `handler-update-act ${JSON.stringify(message, null, 2)}`,
    );

    const {
      value: { payload: actId },
      key: { payload: labId },
    } = message;

    try {
      await this.commandBus.execute(new UpdateActCommand(actId, labId));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getLab(data: labId): Promise<Lab> {
    this.logger.verbose('get-lab.method');

    try {
      const lab: LabModel = await this.queryBus.execute(
        new GetLabQuery(data.id),
      );

      return lab as Lab;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getLabLabel(data: labId): Promise<Label> {
    this.logger.verbose('get-lab.method');

    try {
      const lab: LabModel = await this.queryBus.execute(
        new GetLabQuery(data.id),
      );

      return { label: lab.label } as Label;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}

//   @GrpcMethod('MigrationService')
//   async GetLabsLabes(data: { id: string }): Promise<{ label: string }> {
//     return await this.ls.getLabsLabel(data.id);
//   }
//   @GrpcStreamMethod('MigrationService')
//   async addActsLabReference(data$: Observable<AddActDto>): Promise<void> {
//     this.logger.verbose(
//       `add-new-act-to-lab.controller with addActDto: ${data$}`,
//     );

//     data$.subscribe(data => {
//       this.commandBus.execute(new AddActCommand(data));
//     });
//   }
