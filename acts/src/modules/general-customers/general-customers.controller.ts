import { Controller, Logger } from '@nestjs/common';
import { GeneralCustomersService } from './general-customers.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('general-customers')
export class GeneralCustomersController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly gcustomerService: GeneralCustomersService) {}

  @EventPattern('outbox.event.GeneralCustomer.CREATED')
  async handleNewGeneralCustomer(@Payload() message: any): Promise<void> {
    this.logger.verbose(
      `handle-new-gcustomer ${JSON.stringify(message, null, 2)}`,
    );

    const { value } = message;

    try {
      this.gcustomerService.generalCustomerCreated(value.payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @EventPattern('outbox.event.GeneralCustomer.UPDATED')
  async handleUpdatedGeneralCustomer(@Payload() message: any): Promise<void> {
    this.logger.verbose(`handle-new-gcustomer`);

    const {
      value: { payload: id },
    } = message;

    try {
      this.gcustomerService.generalCustomerUpdated(id);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
