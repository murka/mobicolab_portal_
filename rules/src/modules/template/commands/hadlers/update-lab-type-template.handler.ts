import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLabTypeTemplateCommand } from '../impl/update-lab-type-template.command';
import { Logger } from '@nestjs/common';
import { LabTypeOfSampleTemplateModel } from '../../models/lab-type-of-sample.model';
import { LabTypeTemplateRepository } from '../../template.repository';

@CommandHandler(UpdateLabTypeTemplateCommand)
export class UpdateLabTypeTemplateHandler
  implements ICommandHandler<UpdateLabTypeTemplateCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly ltRepository: LabTypeTemplateRepository) {}

  async execute(
    command: UpdateLabTypeTemplateCommand,
  ): Promise<LabTypeOfSampleTemplateModel> {
    this.logger.verbose('update-lab-type-template.handler');

    const { data } = command;

    try {
      const rule = await this.ltRepository.findOne({
        labId: data.labId,
        typeOfSampleId: data.typeId,
      });

      rule.path = data.path;

      return await this.ltRepository.save(rule);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
