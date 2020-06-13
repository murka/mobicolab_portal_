import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { UpdateGeneralCustomerCommand } from "../impl/update-gcustomer.command";
import { GeneralCustomerRepository } from "../../general-customer.repository";
import { CeneralCustomerUpdatedEvent } from "../../events/impl/gcustomer-updated.event";
import { GeneralCustomer } from "../../models/general-customer.model";

@CommandHandler(UpdateGeneralCustomerCommand)
export class UpdateGeneralCustomerHandler implements ICommandHandler<UpdateGeneralCustomerCommand> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly gsRepository: GeneralCustomerRepository, private readonly eventBus: EventBus) {}

    async execute(command: UpdateGeneralCustomerCommand): Promise<GeneralCustomer> {
        this.logger.verbose('update-general-customer.command')

        const { data } = command

        try {
            const gs = await this.gsRepository.findOne(data.id)

            await this.gsRepository.update(gs, data)

            this.eventBus.publish(new CeneralCustomerUpdatedEvent(gs))

            return gs
        } catch(e) {
            this.logger.error(e)
        }
    }
}