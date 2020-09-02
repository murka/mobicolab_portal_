import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateActCommand } from '../impl/update-act.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ActRepository, LabRepository } from '../../lab.repository';

@CommandHandler(UpdateActCommand)
export class UpdateActHandler implements ICommandHandler<UpdateActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepositroy: ActRepository,
    private readonly labRepositroy: LabRepository,
  ) {}

  async execute(command: UpdateActCommand): Promise<void> {
    this.logger.verbose('update-act.handler');

    const { actId, labId } = command;

    try {
      const lab = await this.labRepositroy.findOne(labId);

      if (lab)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Lab didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      const act = await this.actRepositroy.findOne(actId);

      if (act)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Act didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      act.lab = lab;

      await this.actRepositroy.save(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
