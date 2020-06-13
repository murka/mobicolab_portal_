import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ChangeCustomerIdCommand, ChangeGeneralCustomerIdCommand, ChangeLabIdCommand } from "../impl/migrations.commands";
import { Logger } from "@nestjs/common";
import { CustomerRepository, GCustomerRepository, LabRepository } from "../../references.repository";

@CommandHandler(ChangeCustomerIdCommand)
export class ChangeCustomerIdHandler implements ICommandHandler<ChangeCustomerIdCommand> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(command: ChangeCustomerIdCommand): Promise<void> {
        this.logger.verbose('change-customer-id.command inside `service`')

        const { data } = command

        try{
           await this.customerRepository.changeId(data.newId, data.oldId)
        } catch(e) {
            this.logger.error(e)
        }
    }
}

@CommandHandler(ChangeGeneralCustomerIdCommand)
export class ChangeGeneralCustomerIdHandler implements ICommandHandler<ChangeGeneralCustomerIdCommand> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly gcustomerRepository: GCustomerRepository) {}

    async execute(command: ChangeGeneralCustomerIdCommand): Promise<void> {
        this.logger.verbose('change-gcustomer-id.command inside `service`')

        const { data } = command

        try {
            await this.gcustomerRepository.changeId(data.newId, data.oldId)
        } catch(e) {
            this.logger.error(e)
        }
    }
}

@CommandHandler(ChangeLabIdCommand)
export class ChangeLabIdHandler implements ICommandHandler<ChangeLabIdCommand> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly labRepository: LabRepository) {}

    async execute(command: ChangeGeneralCustomerIdCommand): Promise<void> {
        this.logger.verbose('change-lab-id.command inside `service`')

        const { data } = command

        try {
            await this.labRepository.changeId(data.newId, data.oldId)
        } catch(e) {
            this.logger.error(e)
        }
    }
}