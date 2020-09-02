import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddActCommand } from '../impl/add-act.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { LabRepository, ActRepository } from '../../lab.repository';

@CommandHandler(AddActCommand)
export class AddActHandler implements ICommandHandler<AddActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly labRepository: LabRepository,
    private readonly actRepository: ActRepository,
  ) {}

  async execute(command: AddActCommand): Promise<void> {
    this.logger.verbose('add-act.command');

    const { data } = command;

    try {
      const newAct = this.actRepository.create({ id: data.actId });

      const lab = await this.labRepository.findOne(data.labId);

      if (!lab)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Lab didn`t find',
          },
          HttpStatus.NOT_FOUND,
        );

      newAct.lab = lab;

      await this.actRepository.save(newAct);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
