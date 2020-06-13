import { EntityRepository, Repository } from 'typeorm';
import { Act } from './models/act.model';
import { Customer } from './models/customer.model';
import { MigrationCustomerDto } from './models/dto/migration-customer.dto';
import { Logger } from '@nestjs/common';
import { Event } from './models/event.model';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  logger = new Logger(this.constructor.name);

  async migrationCreateCustomer(
    customer: MigrationCustomerDto,
  ): Promise<Customer> {
    this.logger.verbose(
      'migration-create-custromer inside `CustomerRepository`',
    );

    const newCustomer = this.create({
      fullname: customer.fullname,
      label: customer.label,
      address: customer.address,
      email: customer.email,
      tel: customer.tel,
    })

    await this.save(newCustomer);

    this.logger.log(newCustomer)

    return newCustomer;
  }
}

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {}

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}
