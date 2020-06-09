import { EntityRepository, AbstractRepository } from "typeorm";
import { GeneralCustomer } from "./models/general-customer.model";
import { Act } from "./models/act.model";

@EntityRepository(GeneralCustomer)
export class GeneralCustomerRepository extends AbstractRepository<GeneralCustomer> {
    public async findAll(): Promise<GeneralCustomer[]> {
        return await this.repository.find()
    }

    public async findGCustomer(id: string): Promise<GeneralCustomer> {
        return await this.repository.findOne(id)
    }

    createGenerlaCustomer(gcustomer: GeneralCustomer): GeneralCustomer {
        return this.repository.create(gcustomer);
    }
}

@EntityRepository(Act)
export class ActRepository extends AbstractRepository<Act> {
    public async getGCustomer(id: string): Promise<GeneralCustomer> {
        return (await this.repository.findOne(id)).general_customer;
    }
}