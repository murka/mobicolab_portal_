import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { TypeOfSample } from '../models/type-of-sample.model';
import { Logger } from '@nestjs/common';
import { Habitan } from '../models/habitan.model';
import { HType } from '../models/htype.model';
import { TOSRepository } from '../repositories/tos.repository';

@Resolver(of => TypeOfSample)
export class TOSResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tosRepository: TOSRepository) {}

  @ResolveField(of => Habitan)
  async habitan(@Parent() tos: TypeOfSample) {
    this.logger.verbose('resolve-habitan-field');

    const habitan = (
      await this.tosRepository.findOne(tos.id, { relations: ['habitan'] })
    ).habitan;

    return { __typename: 'Habitan', id: habitan.id };
  }

  @ResolveField(of => HType)
  async htype(@Parent() tos: TypeOfSample) {
    this.logger.verbose('resolve-htype-field');

    const htype = (
      await this.tosRepository.findOne(tos.id, { relations: ['htype'] })
    ).htype;

    return { __typename: 'HType', id: htype.id };
  }
}
