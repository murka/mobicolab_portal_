import { Inject, OnModuleInit, Logger } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Act } from './models/act.model';
import { Customer } from './models/customer.model';
import { Observable } from 'rxjs';
import { map, toArray } from 'rxjs/operators';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { MigrationCreateActDto } from './models/dto/migration-create-act.dto';
import { NewActDto } from './models/dto/new-act.dto';
import { NewActCommand } from './commands/impl/new-act.command';
import { ActRepository } from './act.repository';
import { AddActsReferencesCommand } from './commands/impl/add-acts-references.command';
import { ActsService } from './acts.service';

interface ActsGRPCService {
  findAllActs(data: number): Observable<MigrationCreateActDto>;
}

@Resolver(of => Act)
export class ActResolver implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private actsService: ActsGRPCService;

  constructor(
    private readonly actRepository: ActRepository,
    @Inject('ACT_PACKAGE') private readonly client: ClientGrpc,
    private commandBus: CommandBus,
    private readonly as: ActsService
  ) {}

  onModuleInit() {
    this.actsService = this.client.getService<ActsGRPCService>('ActsService');
  }

  @Query(returns => [Act])
  async acts(): Promise<Act[]> {
    return await this.actRepository.find()
  }

  @Query(returns => Act)
  async act(@Args('id') id: string): Promise<Act> {
    return await this.actRepository.findOne(id)
  }

  @Query(returns => Act)
  actTransform(): Observable<Promise<Act>> {
    return this.actsService.findAllActs(1).pipe(map(async act => {
      const newAct = await this.as.createActFromMigration(act)
      return newAct
    }))
  }

  @Query(returns => [Act])
  async addActsReferences() {
    return await this.commandBus.execute(new AddActsReferencesCommand())
  }

  @Mutation(returns => Act)
  createAct(@Args('newActData') newActData: NewActDto): Promise<Act> {
    this.logger.verbose(`createAct mutation with data: ${newActData}`)
    return this.commandBus.execute(new NewActCommand(newActData))
  }

  // @ResolveReference()
  // async resolveReference(reference: { __typename: string; id: string }) {
  //   return await this.actRepository.findAct(reference.id)
  // }

  @ResolveField(of => Customer)
  public customer(@Parent() act: Act) {
    return { __typename: 'Customer', id: act.customer.id };
  }
}
