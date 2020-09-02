import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { GeneralCustomer } from './models/general-customer.model';
import { Logger } from '@nestjs/common';
import { Act } from '../acts/models/act.model';
import { GeneralCustomersService } from './general-customers.service';

@Resolver(of => GeneralCustomer)
export class GCustomerResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly gcs: GeneralCustomersService) {}

  @ResolveField(of => [Act])
  public async acts(
    @Parent() general_customer: GeneralCustomer,
  ): Promise<Act[]> {
    this.logger.verbose('acts-resolve-fields');

    try {
      return await this.gcs.getActsOfGCustomer(general_customer.id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
