import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from '../impl/get-customers.query';
import { Logger } from '@nestjs/common';
import { Customer } from '../../models/customer.model';
import { CustomerRepository } from '../../customer.repository';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<Customer[]> {
    this.logger.verbose('get-customers.hanler');

    try {
      return await this.customerRepository.find();
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
