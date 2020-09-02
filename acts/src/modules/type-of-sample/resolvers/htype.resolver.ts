import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Act } from 'src/modules/acts/models/act.model';
import { TypeOfSampleService } from '../type-of-sample.service';
import { HType } from '../models/htype.model';

@Resolver(of => HType)
export class HTypeResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tosService: TypeOfSampleService) {}

  @ResolveField(of => [Act])
  async acts(@Parent() htype: HType): Promise<Act[]> {
    this.logger.verbose('acts-reslover-fields');

    try {
      return await this.tosService.getActsOfHType(htype.id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
