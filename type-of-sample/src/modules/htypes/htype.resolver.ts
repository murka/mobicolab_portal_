import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { HType } from './models/habitans-type.model';
import { Logger } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetAllHTypesQuery } from './queries/impl/get-all-htypes.query';
import { CreateHTypeDto } from './models/dto/create-htype.dto';
import { CreateHabitansTypeCommand } from './commands/impl/create-habitans-type.command';
import { GetHTypeQuery } from './queries/impl/get-hype.query';
import { UpdateHabitansTypeCommand } from './commands/impl/update-habitans-type.command';

@Resolver(of => HType)
export class HabitansTypeResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(returns => [HType])
  async getAllHabitansTypes(): Promise<HType[]> {
    this.logger.verbose('get-all-htypes.query');

    try {
      return await this.queryBus.execute(new GetAllHTypesQuery());
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(of => HType)
  async createHabitansType(
    @Args('createHTypeData') createHTypeData: CreateHTypeDto,
  ): Promise<HType> {
    this.logger.verbose('create-habitans-type.mutation');

    try {
      return await this.commandBus.execute(
        new CreateHabitansTypeCommand(
          createHTypeData.habitanId,
          createHTypeData.label,
        ),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(of => HType)
  async updateHabitansType(
    @Args('id') id: string,
    @Args('label') label: string,
  ): Promise<HType> {
    this.logger.verbose('update-habitan-type.methos');

    try {
      return await this.commandBus.execute(
        new UpdateHabitansTypeCommand(id, label),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<HType> {
    this.logger.verbose('resolve reference of type-sample');

    return await this.queryBus.execute(new GetHTypeQuery(reference.id));
  }
}
