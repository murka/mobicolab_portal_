import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddActToContractorsCommand } from '../impl/add-act-to-contractors.command';
import { Logger } from '@nestjs/common';
import { ActRepository } from '../../act.repository';
import { ActsService } from '../../acts.service';

@CommandHandler(AddActToContractorsCommand)
export class AddActToContractrorsHandler
  implements ICommandHandler<AddActToContractorsCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly as: ActsService,
  ) {}

  async execute(command: AddActToContractorsCommand): Promise<void> {
    this.logger.verbose('add-act-to-contractors.command');

    const { actId } = command;

    try {
      const act = await this.actRepository.findOne(actId, {
        relations: ['customer', 'general_customer', 'lab'],
      });

      await this.as.sendContractors(
        act.id,
        act.customer.id,
        act.general_customer.id,
        act.lab.id,
      );
    } catch (e) {
      this.logger.error(e);
    }
  }
}
