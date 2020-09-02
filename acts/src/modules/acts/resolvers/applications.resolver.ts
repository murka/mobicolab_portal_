import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Application } from '../models/application.model';
import { Logger } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetAllApplicationsQuery } from '../queries/impl/get-all-applications.query';
import { CreateAppCommand } from '../commands/impl/create-app.command';
import { DeleteAppCommand } from '../commands/impl/delete-app.command';
import { CopyAppDto } from '../models/dto/copy-app.dto';
import { CreateAppCopyCommand } from '../commands/impl/create-app-copy.command';

@Resolver(of => Application)
export class AppResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(returns => [Application])
  async getAllApplication(): Promise<Application[]> {
    this.logger.verbose('get-all-application');

    try {
      return await this.queryBus.execute(new GetAllApplicationsQuery());
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(returns => Application)
  async createApplication(): Promise<Application> {
    this.logger.verbose('create-application.mutation');

    try {
      return await this.commandBus.execute(new CreateAppCommand());
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(returns => Application)
  async createAppCopy(
    @Args('copyAppData') copyAppData: CopyAppDto,
  ): Promise<Application> {
    this.logger.verbose('create-copy.mutation');

    try {
      return await this.commandBus.execute(
        new CreateAppCopyCommand(copyAppData),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(returns => Application)
  async deleteApplication(@Args('id') id: string): Promise<Application> {
    this.logger.verbose('delete-application.mutation');

    try {
      return await this.commandBus.execute(new DeleteAppCommand(id));
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
