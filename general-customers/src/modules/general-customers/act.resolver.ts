import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Act } from './models/act.model';
import { GeneralCustomer } from './models/general-customer.model';
import { ActRepository } from './general-customer.repository';

//define ActResolver for Apollo Federation usage

@Resolver(of => Act)
export class ActResolver {
  constructor(private actRepository: ActRepository) {}

  // @ResolveField(returns => GeneralCustomer)
  // public async general_customer(@Parent() act: Act): Promise<GeneralCustomer> {
  //   return (await this.actRepository.findOne(act.id, { relations: ['general_customer'] })).general_customer
  // }
}
