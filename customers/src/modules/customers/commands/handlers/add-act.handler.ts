import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddActCommand } from '../impl/add-act.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ActRepository, CustomerRepository } from '../../customer.repository';

@CommandHandler(AddActCommand)
export class AddActHandler implements ICommandHandler<AddActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(command: AddActCommand) {
    this.logger.verbose('add-act.command');

    const { data } = command;

    try {
      const newAct = this.actRepository.create({ id: data.actId });

      const customer = await this.customerRepository.findOne(data.customerId);

      if (!customer)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Customer didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      newAct.customer = customer;

      await this.actRepository.save(newAct);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
