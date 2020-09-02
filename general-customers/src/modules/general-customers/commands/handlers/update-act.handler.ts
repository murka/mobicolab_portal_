import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateActCommand } from '../impl/update-act.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import {
  ActRepository,
  GeneralCustomerRepository,
} from '../../general-customer.repository';

@CommandHandler(UpdateActCommand)
export class UpdateActHandler implements ICommandHandler<UpdateActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly gcRepository: GeneralCustomerRepository,
  ) {}

  async execute(command: UpdateActCommand): Promise<void> {
    this.logger.verbose('update-act.handler');

    const { actId, gcustomerId } = command;

    try {
      const act = await this.actRepository.findOne(actId);

      if (act)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Act didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      const gcustomer = await this.gcRepository.findOne(gcustomerId);

      if (gcustomer)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'GeneralCustomer didn`t find',
          },
          HttpStatus.NOT_FOUND,
        );

      act.general_customer = gcustomer;

      await this.actRepository.save(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
