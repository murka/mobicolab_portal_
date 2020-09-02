import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Habitan } from '../models/habitan.model';
import { Logger } from '@nestjs/common';
import { Act } from 'src/modules/acts/models/act.model';
import { TypeOfSampleService } from '../type-of-sample.service';

@Resolver(of => Habitan)
export class HabitanResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tosService: TypeOfSampleService) {}

  @ResolveField(of => [Act])
  async acts(@Parent() habitan: Habitan): Promise<Act[]> {
    this.logger.verbose('acts-reslover-fields');

    try {
      return await this.tosService.getActsOfHabitan(habitan.id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
