import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { Logger } from '@nestjs/common';
import { Act } from '../acts/models/act.model';
import { CustomersService } from './customers.service';

@Resolver(of => Customer)
export class CustomerResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly cs: CustomersService) {}

  @ResolveField(of => [Act], { nullable: 'itemsAndList' })
  public async acts(@Parent() customer: Customer): Promise<Act[]> {
    this.logger.verbose('acts-resolver-field');

    this.logger.log(customer.id);

    try {
      return await this.cs.getActsOfCustomers(customer.id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
