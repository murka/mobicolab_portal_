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
import { ClientGrpc } from '@nestjs/microservices';
import { ActsService } from './acts.service';
import { MigrationCreateActDto } from './models/dto/migration-create-act.dto';

interface ActsGRPCService {
  findAllActs(data: number): Observable<MigrationCreateActDto>;
}

@Resolver(of => Act)
export class ActResolver implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private actsService: ActsGRPCService;

  constructor(
    private readonly actService: ActsService,
    @Inject('ACT_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.actsService = this.client.getService<ActsGRPCService>('ActsService');
  }

  @Query(returns => [Act])
  async acts(): Promise<Act[]> {
    return await this.actService.findAllActs();
  }

  @Query(returns => Act)
  async act(@Args('id') id: string): Promise<Act> {
    return await this.actService.findActById(id)
  }

  @Query(returns => Act)
  actTransform(): Observable<Promise<Act>> {
    return this.actsService.findAllActs(1).pipe(map(async act => {
      const newAct = await this.actService.createActFromMigration(act)
      this.logger.log(newAct)
      return newAct
    }))
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
