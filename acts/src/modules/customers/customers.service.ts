import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from './models/customer.model';
import { CustomerRepository } from './customers.repository';
import { Act } from '../acts/models/act.model';

@Injectable()
export class CustomersService {
  logger = new Logger(this.constructor.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async findCustomerById(id: string): Promise<Customer> {
    this.logger.verbose('find-cusomer.method');

    try {
      const customer = await this.customerRepository.findOne(id);

      if (!customer)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'customer didn`t find' },
          HttpStatus.NOT_FOUND,
        );
      return customer;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getActsOfCustomers(id: string): Promise<Act[]> {
    this.logger.verbose('inside get-acts-of-customer.method');

    try {
      let acts: Act[] = [];

      const customer = await this.customerRepository.findOne(id, {
        relations: ['acts'],
      });

      this.logger.log(JSON.stringify(customer, null, 2));

      if (!customer || !customer.acts) return acts;

      acts = customer.acts;

      this.logger.log(`acst  ${JSON.stringify(acts, null, 2)}`);

      return acts;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async customerCreated(id: string): Promise<void> {
    this.logger.verbose(`cutomer-created ${id}`);

    try {
      const customer = this.customerRepository.create({ id: id });

      await this.customerRepository.save(customer);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
