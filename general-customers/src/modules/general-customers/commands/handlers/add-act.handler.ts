import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddActCommand } from '../impl/add-act.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import {
  ActRepository,
  GeneralCustomerRepository,
} from '../../general-customer.repository';

@CommandHandler(AddActCommand)
export class AddActHanler implements ICommandHandler<AddActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    // private readonly actRepository: ActRepository,
    private readonly gcustomerRepository: GeneralCustomerRepository,
  ) {}

  async execute(command: AddActCommand) {
    this.logger.verbose('add-act.command');

    const { data } = command;

    try {
      // // const newAct = this.actRepository.create({ id: data.actId });

      // const gcustomer = await this.gcustomerRepository.findOne(
      //   data.gcustomerId,
      // );

      // if (!gcustomer)
      //   throw new HttpException(
      //     {
      //       status: HttpStatus.NOT_FOUND,
      //       error: 'General Customer doesn`t find',
      //     },
      //     HttpStatus.NOT_FOUND,
      //   );

      // // newAct.general_customer = gcustomer;

      // await this.actRepository.save(newAct);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
