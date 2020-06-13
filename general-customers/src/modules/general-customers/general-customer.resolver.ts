import { Resolver, Query, Args, ResolveReference, Mutation } from '@nestjs/graphql';
import { GeneralCustomer } from './models/general-customer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger, Inject, OnModuleInit } from '@nestjs/common';
import { GeneralCustomerRepository } from './general-customer.repository';
import { ClientGrpc } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { ChangeGCustomerIdCommand } from './commands/impl/change-gcustomer-id.command';
import { CreateGeneralCustomerDto } from './models/dto/create-gcustomer.dto';
import { InsertGeneralCustomerDto } from './models/dto/insert-gcustomer.dto';
import { CreateGeneralCustomerCommand } from './commands/impl/create-lab.command';
import { UpdateGeneralCustomerCommand } from './commands/impl/update-lab.command';

interface GCustomerService {
  findAllGeneralCustomers(data: number): Observable<GeneralCustomer>;
}

@Resolver(of => GeneralCustomer)
export class GeneralCustomerResolver implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private gcustomerService: GCustomerService;

  constructor(
    private readonly gcustomerRepository: GeneralCustomerRepository,
    @Inject('BRIDGE_PACKAGE') private readonly client: ClientGrpc,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit() {
    this.gcustomerService = this.client.getService<GCustomerService>(
      'GeneralCustomerService',
    );
  }

  @Query(returns => [GeneralCustomer])
  async customers(): Promise<GeneralCustomer[]> {
    return await this.gcustomerRepository.find();
  }

  @Query(returns => GeneralCustomer)
  async customer(@Args('id') id: string): Promise<GeneralCustomer> {
    return await this.gcustomerRepository.findOne(id);
  }

  @Query(returns => GeneralCustomer)
  transformGCustomers(): Observable<Promise<GeneralCustomer>> {
    return this.gcustomerService.findAllGeneralCustomers(1).pipe(
      map(async gcustomer => {
        const newGCustomer = await this.gcustomerRepository.migrationCreateGCustomer(
          gcustomer,
        );
        await this.commandBus.execute(
          new ChangeGCustomerIdCommand(newGCustomer.id, gcustomer.id),
        );
        this.logger.verbose(newGCustomer);
        return newGCustomer;
      }),
    );
  }

  @Mutation(returns => GeneralCustomer)
  async createLab(
    @Args('createLabData') createLabData: CreateGeneralCustomerDto,
  ): Promise<GeneralCustomer> {
    return await this.commandBus.execute(new CreateGeneralCustomerCommand(createLabData));
  }

  @Mutation(returns => GeneralCustomer)
  async updateLab(
    @Args('insertLabData') insertLabData: InsertGeneralCustomerDto,
  ): Promise<GeneralCustomer> {
    return await this.commandBus.execute(new UpdateGeneralCustomerCommand(insertLabData));
  }

  @ResolveReference()
  async resolverReference(reference: { __typename: string; id: string }) {
    return await this.gcustomerRepository.findOne(reference.id);
  }
}
