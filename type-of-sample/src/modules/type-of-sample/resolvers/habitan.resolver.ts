import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Habitan } from '../models/habitan.model';
import { Logger } from '@nestjs/common';
import { HabitansType } from '../models/habitans-type.model';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetAllHabitansQuery } from 'src/queries/impl/get-all-habitans.query';
import { CreateHabitanCommand } from 'src/commands/impl/create-habitan.command';
import { UpdateHabitanCommand } from 'src/commands/impl/update-habitan.command';
import { CreateHabitansTypeCommand } from 'src/commands/impl/create-habitans-type.command';
import { GetHabitansTypesByParentQuery } from 'src/queries/impl/get-habitans-types-by-parent.query';
import { UpdateHabitansTypeCommand } from 'src/commands/impl/update-habitans-type.command';

@Resolver(of => Habitan)
export class HabitanResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(returns => Habitan)
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
    this.logger.verbose('create-habitan.method');

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
    this.logger.verbose('create-habitan.method');

    try {
      return await this.commandBus.execute(new UpdateHabitanCommand(id, label));
    } catch (error) {
      this.logger.error(error);
    }
  }

  @ResolveField()
  async htypes(@Parent() habitan: Habitan): Promise<HabitansType[]> {
    this.logger.verbose('resolve-fielde-htypes.method');

    const { id } = habitan;

    try {
      return await this.queryBus.execute(new GetHabitansTypesByParentQuery(id));
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(of => HabitansType)
  async createHabitnsType(
    @Parent() habitan: Habitan,
    @Args('label') label: string,
  ): Promise<HabitansType> {
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

  @Mutation(of => HabitansType)
  async updateHabitansType(
    @Args('id') id: string,
    @Args('label') label: string,
  ): Promise<HabitansType> {
    this.logger.verbose('update-habitan-type.methos');

    try {
      return await this.commandBus.execute(
        new UpdateHabitansTypeCommand(id, label),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
