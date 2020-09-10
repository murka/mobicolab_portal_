import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { Habitan } from './models/habitan.model';
import { Logger } from '@nestjs/common';
import { HType } from '../htypes/models/habitans-type.model';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetAllHabitansQuery } from './queries/impl/get-all-habitans.query';
import { CreateHabitanCommand } from 'src/modules/habitans/commands/impl/create-habitan.command';
import { UpdateHabitanCommand } from 'src/modules/habitans/commands/impl/update-habitan.command';
import { CreateHabitansTypeCommand } from 'src/modules/htypes/commands/impl/create-habitans-type.command';
import { GetHabitansTypesByParentQuery } from './queries/impl/get-habitans-types-by-parent.query';
import { UpdateHabitansTypeCommand } from 'src/modules/htypes/commands/impl/update-habitans-type.command';
import { GetHabitnQuery } from './queries/impl/get-habitan.query';

@Resolver(of => Habitan)
export class HabitanResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(returns => [Habitan])
  async getAllHabitans(): Promise<Habitan[]> {
    this.logger.verbose('get-all-habitan.query');

    try {
      return await this.queryBus.execute(new GetAllHabitansQuery());
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(of => Habitan)
  async createHabitan(@Args('label') label: string): Promise<Habitan> {
    this.logger.verbose(`create-habitan.method ${label}`);

    try {
      return await this.commandBus.execute(new CreateHabitanCommand(label));
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(of => Habitan)
  async updateHabitan(
    @Args('id') id: string,
    @Args('label') label: string,
  ): Promise<Habitan> {
    this.logger.verbose('update-habitan.method');

    try {
      return await this.commandBus.execute(new UpdateHabitanCommand(id, label));
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(of => HType)
  async createHabitnsTypeParent(
    @Parent() habitan: Habitan,
    @Args('label') label: string,
  ): Promise<HType> {
    this.logger.verbose('create-habitans-type.mutation');

    const { id } = habitan;

    try {
      return await this.commandBus.execute(
        new CreateHabitansTypeCommand(id, label),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<Habitan> {
    this.logger.verbose('resolve reference of type-sample');

    return await this.queryBus.execute(new GetHabitnQuery(reference.id));
  }
}
