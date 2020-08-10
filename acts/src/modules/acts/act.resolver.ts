import { Inject, OnModuleInit, Logger } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Act } from './models/act.model';
import { Customer } from './models/customer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientGrpc } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { MigrationCreateActDto } from './models/dto/migration-create-act.dto';
import { NewActDto } from './models/dto/new-act.dto';
import { NewActCommand } from './commands/impl/new-act.command';
import { ActRepository } from './act.repository';
import { AddActsReferencesCommand } from './commands/impl/add-acts-references.command';
import { ActsService } from './acts.service';
import { UpdateActCommand } from './commands/impl/update-act.command';
import { PatchActDto } from './models/dto/patch-act.dto';
import { GeneralCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { Doc } from './models/doc.model';

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
    private readonly as: ActsService,
  ) {}

  onModuleInit() {
    this.actsService = this.client.getService<ActsGRPCService>('ActsService');
  }

  @Query(returns => [Act])
  async getActs(): Promise<Act[]> {
    return await this.actRepository.find();
  }

  @Query(returns => Act)
  async getAct(@Args('id') id: string): Promise<Act> {
    return await this.actRepository.findOne(id);
  }

  @Query(returns => Act)
  actTransform(): Observable<Promise<Act>> {
    return this.actsService.findAllActs(1).pipe(
      map(async act => {
        const newAct = await this.as.createActFromMigration(act);
        return newAct;
      }),
    );
  }

  @Query(returns => [Act])
  async addActsReferences() {
    return await this.commandBus.execute(new AddActsReferencesCommand());
  }

  @Mutation(returns => Act)
  async createAct(@Args('newActData') newActData: NewActDto): Promise<Act> {
    this.logger.verbose(`createAct mutation with data: ${newActData}`);
    return await this.commandBus.execute(new NewActCommand(newActData));
  }

  @Mutation(returns => Act)
  async updateAct(
    @Args('updateActData') updateActData: PatchActDto,
  ): Promise<Act> {
    this.logger.verbose(
      `update mutation with data: ${JSON.stringify(updateActData, null, 2)}`,
    );
    return await this.commandBus.execute(new UpdateActCommand(updateActData));
  }

  // @ResolveReference()
  // async resolveReference(reference: { __typename: string; id: string }) {
  //   return await this.actRepository.findAct(reference.id)
  // }

  @ResolveField(of => Customer)
  public customer(@Parent() act: Act) {
    this.logger.verbose(
      `customer resolverField ${JSON.stringify(act.customer, null, 2)}`,
    );
    return { __typename: 'Customer', id: act.customer.id };
  }

  @ResolveField(of => GeneralCustomer)
  general_customer(@Parent() act: Act) {
    this.logger.verbose(
      `gcustomer resolverField ${JSON.stringify(
        act.general_customer,
        null,
        2,
      )}`,
    );
    return { __typename: 'GeneralCustomer', id: act.general_customer.id };
  }

  @ResolveField(of => Lab)
  lab(@Parent() act: Act) {
    return { __typename: 'Lab', id: act.lab.id };
  }

  @ResolveField(of => Doc)
  async docs(@Parent() act: Act) {
    this.logger.verbose('resolve-doc-reference.method');

    if (act.docs.length < 1) return [];

    return { __typename: 'Doc', id: act.id };
  }
}
