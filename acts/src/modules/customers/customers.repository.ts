import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './models/customer.model';
import { Logger } from '@nestjs/common';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  logger = new Logger(this.constructor.name);

  async changeId(newId: string, oldId: string): Promise<void> {
    this.logger.verbose('changer id inside repository');

    const customer = await this.findOne(oldId);

    if (customer) {
      await this.update(customer, { id: newId });
    }
  }
}
