import { Controller, Logger } from '@nestjs/common';
import {
  customerId,
  Customer,
  CustomerServiceControllerMethods,
  CustomerServiceController,
  Label,
} from 'src/models/build/customer/customer';
import { Customer as CustomerModel } from './models/customer.model';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetCustomerQuery } from './queries/impl/get-customer.query';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AddActCommand } from './commands/impl/add-act.command';
import { UpdateActCommand } from './commands/impl/update-act.command';

@Controller('customers')
@CustomerServiceControllerMethods()
export class CustomersController implements CustomerServiceController {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @EventPattern('outbox.event.ACT.Customer.CREATED')
  async handlerNewAct(@Payload() message: any): Promise<void> {
    this.logger.verbose(`handler-new-act ${JSON.stringify(message, null, 2)}`);

    const {
      value: { payload: actId },
      key: { payload: customerId },
    } = message;

    try {
      await this.commandBus.execute(new AddActCommand({ actId, customerId }));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @EventPattern('outbox.event.ACT.Customer.UPDATED')
  async handlerUpdatedAct(@Payload() message: any): Promise<void> {
    this.logger.verbose(
      `handler-updated-act ${JSON.stringify(message, null, 2)}`,
    );

    const {
      value: { payload: actId },
      key: { payload: customerId },
    } = message;

    try {
      await this.commandBus.execute(new UpdateActCommand(actId, customerId));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getCustomer(data: customerId): Promise<Customer> {
    this.logger.verbose('get-customer.method');

    try {
      const customer: CustomerModel = await this.queryBus.execute(
        new GetCustomerQuery(data.id),
      );

      return customer as Customer;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getCustomerLabel(data: customerId): Promise<Label> {
    this.logger.verbose('get-customer-label.method');

    try {
      const customer: CustomerModel = await this.queryBus.execute(
        new GetCustomerQuery(data.id),
      );

      return { label: customer.label } as Label;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
