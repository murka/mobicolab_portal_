import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddActCommand } from '../impl/add-act.command';
import { Logger } from '@nestjs/common';
import { LabRepository, ActRepository } from '../../lab.repository';

@CommandHandler(AddActCommand)
export class AddActHandler implements ICommandHandler<AddActCommand> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly labRepository: LabRepository,
        private readonly actRepository: ActRepository) {}

    async execute(command: AddActCommand) {
        this.logger.verbose('add-act.command')

        const { data } = command

        try{
            const newAct = this.actRepository.create({ id: data.actId })

            const lab = await this.labRepository.findOne(data.labId)

            newAct.lab = lab

            await this.actRepository.save(newAct)
        } catch(e) {
            this.logger.error(e)
        }
    }
}