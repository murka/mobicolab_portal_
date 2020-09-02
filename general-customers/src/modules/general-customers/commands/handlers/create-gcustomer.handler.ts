import {
  CommandHandler,
  ICommandHandler,
  EventBus,
  EventPublisher,
} from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateGeneralCustomerCommand } from '../impl/create-gcustomer.command';
import { GeneralCustomer } from '../../models/general-customer.model';
import { GeneralCustomerRepository } from '../../general-customer.repository';

@CommandHandler(CreateGeneralCustomerCommand)
export class CreateGeneralCustomerHandler
  implements ICommandHandler<CreateGeneralCustomerCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly gsRepository: GeneralCustomerRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(
    command: CreateGeneralCustomerCommand,
  ): Promise<GeneralCustomer> {
    this.logger.verbose('create-general-customer.command');

    const { data } = command;

    try {
      const gs = this.gsRepository.create(data);

      await this.gsRepository.save(gs);

      const event = this.publisher.mergeObjectContext(gs);

      event.generalCustomerCreated();
      event.commit();

      return gs;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
