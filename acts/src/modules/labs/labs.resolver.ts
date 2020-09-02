import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Lab } from './models/lab.model';
import { Logger } from '@nestjs/common';
import { LabsService } from './labs.service';
import { Act } from '../acts/models/act.model';

@Resolver(of => Lab)
export class LabResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly labService: LabsService) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() lab: Lab): Promise<Act[]> {
    this.logger.verbose('acts-resolver-fields');

    try {
      return await this.labService.getActsOfLab(lab.id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
