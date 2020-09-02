import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetCustomerQuery } from '../impl/get-customer.query';
import { Logger } from '@nestjs/common';
import { Customer } from '../../models/customer.model';
import { CustomerRepository } from '../../customer.repository';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(query: GetCustomerQuery): Promise<Customer> {
    this.logger.verbose('get-customer-by-act.handler');

    const { id } = query;

    try {
      //   const customer = await this.customerRepository.findOne(id);

      const customer = (await this.customerRepository.find())[0];

      return customer;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
