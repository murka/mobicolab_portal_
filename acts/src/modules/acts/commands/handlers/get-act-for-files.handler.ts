import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetActForFilesCommand } from '../impl/get-act-for-files.command';
import { Logger } from '@nestjs/common';
import { ActForFilesDto } from '../../models/dto/act-for-files.dto';
import { ActsService } from '../../acts.service';

@CommandHandler(GetActForFilesCommand)
export class GetActWithContractorsHandler
  implements ICommandHandler<GetActForFilesCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly as: ActsService) {}

  async execute(command: GetActForFilesCommand): Promise<ActForFilesDto> {
    this.logger.verbose('get-act-for-files.command');

    const { actId } = command;

    try {
      const act = await this.as.findAct(actId);

      const customersLabel = await this.as.getCusomersLabel(act.customer.id);
      const gcustomersLabel = await this.as.getGCustomersLabel(
        act.general_customer.id,
      );
      const labsLabel = await this.as.getLabsLabel(act.lab.id);

      return {
        id: actId,
        name: act.name,
        customer: customersLabel,
        general_customer: gcustomersLabel,
        lab: labsLabel,
        datetime: act.datetime,
      };
      
    } catch (e) {
      this.logger.error(e);
    }
  }
}
