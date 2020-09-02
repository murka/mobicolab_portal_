import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateActCommand } from '../impl/update-act.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ActRepository, CustomerRepository } from '../../customer.repository';

@CommandHandler(UpdateActCommand)
export class UpdateActHandler implements ICommandHandler<UpdateActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(command: UpdateActCommand): Promise<void> {
    this.logger.verbose('update-act.handler');

    const { actId, customerId } = command;

    try {
      const customer = await this.customerRepository.findOne(customerId);

      if (customer)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Customer didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      const act = await this.actRepository.findOne(actId);

      if (act)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Act didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      act.customer = customer;

      await this.actRepository.save(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
