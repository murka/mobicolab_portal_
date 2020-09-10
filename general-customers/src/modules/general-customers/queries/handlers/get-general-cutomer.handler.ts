import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetGeneralCustomerQuery } from '../impl/get-general-customer.query';
import { Logger } from '@nestjs/common';
import { GeneralCustomer } from '../../models/general-customer.model';
import { GeneralCustomerRepository } from '../../general-customer.repository';

@QueryHandler(GetGeneralCustomerQuery)
export class GetGeneralCustomerHandler
  implements IQueryHandler<GetGeneralCustomerQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly gcutomerRepository: GeneralCustomerRepository) {}

  async execute(query: GetGeneralCustomerQuery): Promise<GeneralCustomer> {
    this.logger.verbose('get-gcustomer.handler');

    const { gcustomerId } = query;

    try {
      return await this.gcutomerRepository.findOne(gcustomerId);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
