import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { UpdateLabCommand } from "../impl/update-lab.command";
import { Logger } from "@nestjs/common";
import { Lab } from "../../models/lab.model";
import { LabRepository } from "../../lab.repository";
import { LabUpdatedEvent } from "../../events/impl/lab-updated.event";

@CommandHandler(UpdateLabCommand)
export class UpdateLabHandler implements ICommandHandler<UpdateLabCommand> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly labRepository: LabRepository, private readonly eventBus: EventBus) {}

    async execute(command: UpdateLabCommand): Promise<Lab> {
        this.logger.verbose('update-lab.command')

        const { data } = command

        try {
            const lab = await this.labRepository.findOne(data.id)

            await this.labRepository.update(lab, data)

            this.eventBus.publish(new LabUpdatedEvent(lab))

            return lab
        } catch(e) {
            this.logger.error(e)
        }
    }
}