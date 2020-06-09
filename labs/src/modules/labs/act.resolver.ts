import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Act } from './models/act.model';
import { Lab } from './models/lab.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ActRepository } from './lab.repository';

//define ActResolver for Apollo Federation usage

@Resolver(of => Act)
export class ActResolver {
  constructor(@InjectRepository(ActRepository) private readonly actRepository: ActRepository) {}

  @ResolveField(of => Lab)
  public async customer(@Parent() act: Act): Promise<Lab> {
    return await this.actRepository.getLab(act.id)
  }
}
