import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { Customer } from './models/customer.model';
import { ActRepository } from './customer.repository';

//define ActResolver for Apollo Federation usage

@Resolver(of => Act)
export class ActResolver {
  constructor(@InjectRepository(ActRepository) private actRepository: ActRepository) {}
  @ResolveField(returns => Customer)
  public async customer(@Parent() act: Act): Promise<Customer> {
    return (await this.actRepository.findOne(act.id)).customer
  }
}
