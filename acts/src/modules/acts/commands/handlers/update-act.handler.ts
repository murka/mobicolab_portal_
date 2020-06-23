import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateActCommand } from '../impl/update-act.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ActRepository } from '../../act.repository';
import { Act } from '../../models/act.model';
import { ActsService } from '../../acts.service';
import { ActUpdatedEvent } from '../../events/impl/act-updated.event';

@CommandHandler(UpdateActCommand)
export class UpdateActHandler implements ICommandHandler<UpdateActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly as: ActsService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateActCommand): Promise<Act> {
    this.logger.verbose('update-act.command');

    const { data } = command;

    try {
      const act = await this.actRepository.findOne(data.id);

      if (!act)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Act doesn`t find',
          },
          HttpStatus.NOT_FOUND,
        );

      const { customer, gcustomer, lab } = await this.as.getContractors(
        data.customer,
        data.general_customer,
        data.lab,
      );

      const ud = { ...data, customer: customer, general_customer: gcustomer, lab: lab }

      this.eventBus.publish(new ActUpdatedEvent(act.id))

      return await this.actRepository.save({ ...act, ...ud });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
