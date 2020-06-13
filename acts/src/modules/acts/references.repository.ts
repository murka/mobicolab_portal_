import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Customer } from './models/customer.model';
import { GCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { Event } from './models/act-event.model';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  logger = new Logger(this.constructor.name);

  async changeId(newId: string, oldId: string): Promise<void> {
    this.logger.verbose('changer id inside repository');

    const customer = await this.findOne(oldId);
    
    if (customer) {
      await this.update(customer, {id: newId})
    }
  }
}

@EntityRepository(GCustomer)
export class GCustomerRepository extends Repository<GCustomer> {
  logger = new Logger(this.constructor.name);

  async changeId(newId: string, oldId: string): Promise<void> {
    this.logger.verbose('changer id inside repository');

    const gcustomer = await this.findOne(oldId);
    
    if (gcustomer) {
      await this.update(gcustomer, {id: newId})
    }
  }
}

@EntityRepository(Lab)
export class LabRepository extends Repository<Lab> {
  logger = new Logger(this.constructor.name);

  async changeId(newId: string, oldId: string): Promise<void> {
    this.logger.verbose('changer id inside repository');

    const lab = await this.findOne(oldId);
    
    if (lab) {
      await this.update(lab, {id: newId})
    }
  }
}

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}