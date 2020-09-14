import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly customerService: CustomersService) {}

  @EventPattern('outbox.event.Customer.CREATED')
  async handleNewCustomer(@Payload() message: any): Promise<void> {
    this.logger.verbose(
      `handle-new-customer ${JSON.stringify(message, null, 2)}`,
    );

    const { value } = message;

    try {
      this.customerService.customerCreated(value.payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @EventPattern('outbox.event.Customer.UPDATED')
  async handleUpdateCustomer(@Payload() message: any): Promise<void> {
    this.logger.verbose('handle-update-customer');

    const {
      value: { payload: id },
    } = message;

    try {
      this.customerService.customerUpdated(id);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
