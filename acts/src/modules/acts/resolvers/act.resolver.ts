import { Inject, OnModuleInit, Logger } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Act } from '../models/act.model';
import { Customer } from '../../customers/models/customer.model';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MigrationCreateActDto } from '../models/dto/migration-create-act.dto';
import { NewActDto } from '../models/dto/new-act.dto';
import { NewActCommand } from '../commands/impl/new-act.command';
import { ActRepository } from '../repositories/act.repository';
import { ActsService } from '../acts.service';
import { UpdateActCommand } from '../commands/impl/update-act.command';
import { PatchActDto } from '../models/dto/patch-act.dto';
import { GeneralCustomer } from '../../general-customers/models/general-customer.model';
import { Lab } from '../../labs/models/lab.model';
import { Doc } from '../../files/models/doc.model';

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
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit() {
    this.actsService = this.client.getService<ActsGRPCService>('ActsService');
  }

  @Query(returns => [Act], { nullable: 'itemsAndList' })
  async getActs(): Promise<Act[]> {
    return await this.actRepository.find();
  }

  @Query(returns => Act)
  async getAct(@Args('id') id: string): Promise<Act> {
    const act = await this.actRepository.findOne(id, {
      relations: ['typeOfSample'],
    });

    return act;
  }

  @Mutation(returns => Act)
  async createAct(@Args('newActData') newActData: NewActDto): Promise<Act> {
    this.logger.verbose(`create act with ${newActData}`);

    try {
      return await this.commandBus.execute(new NewActCommand(newActData));
    } catch (error) {
      this.logger.error(error);
    }
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
      `gcustomer resolverField ${JSON.stringify(act.generalCustomer, null, 2)}`,
    );
    return { __typename: 'GeneralCustomer', id: act.generalCustomer.id };
  }

  @ResolveField(of => Lab)
  lab(@Parent() act: Act) {
    this.logger.verbose('resolve-lab-field');
    return { __typename: 'Lab', id: act.lab.id };
  }

  @ResolveField(of => [Doc])
  async docs(@Parent() act: Act) {
    this.logger.verbose('resolve-doc-reference.method');

    this.logger.log('files');

    this.logger.log(act.docs);

    if (act.docs.length < 1) return [];

    const docIds = await this.as.getDocIds(act.id);

    this.logger.log(docIds);

    return docIds.map(id => {
      return { __typename: 'Doc', id: id };
    });
  }

  //   @ResolveField(of => TypeOfSample)
  //   async typeOfSample(@Parent() act: Act): Promise<TypeOfSample> {
  //     this.logger.verbose('resolve-`typeOfSample`');

  //     try {
  //       return await this.queryBus.execute(new GetTOSQuery(act.typeOfSample.id));
  //     } catch (error) {
  //       this.logger.error(error);
  //     }
  //   }
}

//   @Query(returns => Act)
//   actTransform(): Observable<Promise<Act>> {
//     return this.actsService.findAllActs(1).pipe(
//       map(async act => {
//         const newAct = await this.as.createActFromMigration(act);
//         return newAct;
//       }),
//     );
//   }

//   @Query(returns => [Act])
//   async addActsReferences() {
//     return await this.commandBus.execute(new AddActsReferencesCommand());
//   }
