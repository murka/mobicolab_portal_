import { EntityRepository, AbstractRepository } from 'typeorm';
import { Act } from './models/act.model';
import { Customer } from './models/customer.model';

@EntityRepository(Customer)
export class CustomerRepository extends AbstractRepository<Customer> {
    public async findAll(): Promise<Customer[]> {
        return await this.repository.find()
    }

    public async findCustomer(id: string): Promise<Customer> {
        return await this.repository.findOne(id)
    }

    createCustomer(customer: Customer): Customer {
        return this.repository.create(customer);
    }
}

@EntityRepository(Act)
export class ActRepository extends AbstractRepository<Act> {
    public async getCustomer(id: string): Promise<Customer> {
        return (await this.repository.findOne(id)).customer
    }
}
