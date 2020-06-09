import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Act } from './models/act.model';
import { GeneralCustomer } from './models/general-customer.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ActRepository } from './general-customer.repository';

//define ActResolver for Apollo Federation usage

@Resolver(of => Act)
export class ActResolver {
  constructor(@InjectRepository(ActRepository) private actRepository: ActRepository) {}

  @ResolveField(of => GeneralCustomer)
  public async customer(@Parent() act: Act): Promise<GeneralCustomer> {
    return await this.actRepository.getGCustomer(act.id)
  }
}
