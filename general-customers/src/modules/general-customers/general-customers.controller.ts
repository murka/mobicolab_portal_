import { Controller, Logger } from '@nestjs/common';
import {
  GeneralCustomerServiceControllerMethods,
  GeneralCustomerServiceController,
  gcustomerId,
  GeneralCustomer,
  Label,
} from 'src/models/build/general-customer/gneral-customer';
import { GeneralCustomer as GeneralCustomerModel } from './models/general-customer.model';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetGeneralCustomerQuery } from './queries/impl/get-general-customer.query';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AddActCommand } from './commands/impl/add-act.command';
import { UpdateActCommand } from './commands/impl/update-act.command';

@Controller('general-customers')
@GeneralCustomerServiceControllerMethods()
export class GeneralCustomersController
  implements GeneralCustomerServiceController {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @EventPattern('outbox.event.ACT.GeneralCustomer.CREATED')
  async handlerNewAct(@Payload() message: any): Promise<void> {
    this.logger.verbose(`handler-new-act ${JSON.stringify(message, null, 2)}`);

    const {
      value: { payload: actId },
      key: { payload: gcustomerId },
    } = message;

    try {
      await this.commandBus.execute(new AddActCommand({ actId, gcustomerId }));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @EventPattern('outbox.event.ACT.GeneralCustomer.UPDATED')
  async handlerUpdateAct(@Payload() message: any): Promise<void> {
    this.logger.verbose(
      `handler-update-act ${JSON.stringify(message, null, 2)}`,
    );

    const {
      value: { payload: actId },
      key: { payload: gcustomerId },
    } = message;

    try {
      await this.commandBus.execute(new UpdateActCommand(actId, gcustomerId));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getGeneralCustomer(data: gcustomerId): Promise<GeneralCustomer> {
    this.logger.verbose('get-gcustomer.method');

    try {
      const gcustomer: GeneralCustomerModel = await this.queryBus.execute(
        new GetGeneralCustomerQuery(data.id),
      );

      return gcustomer as GeneralCustomer;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getGeneralCustomerLabel(data: gcustomerId): Promise<Label> {
    this.logger.verbose('get-gcustomer-to-file.method');

    try {
      const gcustomer: GeneralCustomerModel = await this.queryBus.execute(
        new GetGeneralCustomerQuery(data.id),
      );

      return { label: gcustomer.label } as Label;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}

//   @GrpcStreamMethod('MigrationService')
//   async addActsGeneralCusromerReference(
//     data$: Observable<AddActDto>,
//   ): Promise<void> {
//     this.logger.verbose(
//       `add-new-act-to-gcustomer.controller with addActDto: ${data$}`,
//     );

//     data$.subscribe(data => {
//       this.commandBus.execute(new AddActCommand(data));
//     });
//   }

//   @GrpcMethod('MigrationService')
//   async getGCustomersLabel(data: { id: string }): Promise<{ label: string }> {
//     this.logger.verbose('get-general-customer`s-label.grpc-method');

//     try {
//       return await this.gcs.getGCustomersLabel(data.id);
//     } catch (e) {
//       this.logger.error(e);
//     }
//   }
