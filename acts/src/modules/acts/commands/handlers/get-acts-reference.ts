import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  GetActsOfCustomerCommand,
  GetActsOfGCustomerCommand,
  GetActsOfLabCommand,
} from '../impl/get-acts-reference';
import { Logger } from '@nestjs/common';
import {
  CustomerRepository,
  GCustomerRepository,
  LabRepository,
} from '../../references.repository';
import { Act } from '../../models/act.model';

@CommandHandler(GetActsOfCustomerCommand)
export class GetActsOfCustomerHadler
  implements ICommandHandler<GetActsOfCustomerCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(command: GetActsOfCustomerCommand): Promise<Act[]> {
    this.logger.verbose('inside get-acts-of-customer.command');

    const { customerId } = command;

    try {
      return (await this.customerRepository.findOne(customerId, { relations: ['acts'] })).acts;
    } catch (e) {
      this.logger.error(e);
    }
  }
}

@CommandHandler(GetActsOfGCustomerCommand)
export class GetActsOfGCustomerHandler
  implements ICommandHandler<GetActsOfGCustomerCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly gcusrtomerRepository: GCustomerRepository) {}

  async execute(command: GetActsOfGCustomerCommand): Promise<Act[]> {
    this.logger.verbose('get-acts-of-general-customer.command');

    const { gcustomerId } = command;

    try {
      return (
        await this.gcusrtomerRepository.findOne(gcustomerId, {
          relations: ['acts'],
        })
      ).acts;
    } catch (e) {
      this.logger.error(e);
    }
  }
}

@CommandHandler(GetActsOfLabCommand)
export class GetActsOfLabHandler
  implements ICommandHandler<GetActsOfLabCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly labRepository: LabRepository) {}

  async execute(command: GetActsOfLabCommand): Promise<Act[]> {
    this.logger.verbose('get-acts-of-lab.command');

    const { labId } = command;

    try {
      return (await this.labRepository.findOne(labId)).acts;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
