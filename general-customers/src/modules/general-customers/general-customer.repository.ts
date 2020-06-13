import { EntityRepository, Repository } from "typeorm";
import { GeneralCustomer } from "./models/general-customer.model";
import { Act } from "./models/act.model";
import { Logger } from "@nestjs/common";
import { MigrationGCustomerDto } from "./models/dto/migration-gcustomer.dto";

@EntityRepository(GeneralCustomer)
export class GeneralCustomerRepository extends Repository<GeneralCustomer> {
    logger = new Logger(this.constructor.name)

    async migrationCreateGCustomer(
        gcustomer: MigrationGCustomerDto
    ): Promise<GeneralCustomer> {
        this.logger.verbose('migraion-create-gcustomer.method inside `GCustomerRepository`')

        const newGCustomer = this.create({
            fullname: gcustomer.fullname,
            label: gcustomer.label,
            address: gcustomer.address,
            email: gcustomer.email,
            tel: gcustomer.tel,
        })

        await this.save(newGCustomer)

        this.logger.log(newGCustomer)

        return newGCustomer
    }
}

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {
}