import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { Act } from './models/act.model';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CustomerRepository,
  GCustomerRepository,
} from './act.repository';
import { GCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { ActsService } from './acts.service';

@Resolver(of => Customer)
export class CustomerResolver {
  constructor(
    private readonly actService: ActsService
  ) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() customer: Customer): Promise<Act[]> {
    return this.actService.getActsOfCustomer(customer.id)
  }

  // @ResolveField(of => Act)
  // public async act(@Parent() customer: Customer, @Args('actId') actId: string): Promise<Act> {
  //   return this.customerRepository.getAct(customer.id, actId)
  // }
}

@Resolver(of => GCustomer)
export class GCustomerResolver {
  constructor(
    private readonly actService: ActsService
  ) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() general_customer: GCustomer): Promise<Act[]> {
    return this.actService.getActsOfGCustomer(general_customer.id)
  }
}

@Resolver(of => Lab)
export class LabResolver {
  constructor(
    private readonly actService: ActsService
  ) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() lab: Lab): Promise<Act[]> {
    return this.actService.getActsOfLabs(lab.id)
  }
}
