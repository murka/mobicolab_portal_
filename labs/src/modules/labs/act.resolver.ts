import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Act } from './models/act.model';
import { Lab } from './models/lab.model';
import { ActRepository } from './lab.repository';

//define ActResolver for Apollo Federation usage

@Resolver(of => Act)
export class ActResolver {
  constructor(private readonly actRepository: ActRepository) {}

  // @ResolveField(returns => Lab)
  // public async lab(@Parent() act: Act): Promise<Lab> {
  //   return (await this.actRepository.findOne(act.id, { relations: ['lab'] })).lab
  // }
}
