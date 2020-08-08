import { Inject, OnModuleInit, Logger } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { CustomerRepository } from './customer.repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientGrpc } from '@nestjs/microservices';
import { MigrationCustomerDto } from './models/dto/migration-customer.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ChangeCustomerIdCommand } from './commands/impl/change-customer-id.command';
import { CreateCustomerDto } from './models/dto/create-customer.dto';
import { CreateCustomerCommand } from './commands/impl/create-customer.command';
import { PatchCustomerDto } from './models/dto/patch-customer.dto';
import { UpdateCustomerCommand } from './commands/impl/update-customer.command';

interface CustomerService {
  findAllCustomers(data: number): Observable<MigrationCustomerDto>;
}

@Resolver(of => Customer)
export class CustomerResolver implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private customerService: CustomerService;

  constructor(
    private readonly customerRepository: CustomerRepository,
    @Inject('BRIDGE_PACKAGE') private readonly client: ClientGrpc,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit() {
    this.customerService = this.client.getService<CustomerService>(
      'CustomerService',
    );
  }

  @Query(returns => [Customer])
  async getCustomers(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  @Query(returns => Customer)
  async customer(@Args('id') id: string): Promise<Customer> {
    return await this.customerRepository.findOne(id);
  }

  @Query(returns => Customer)
  async transferCustomers() {
    this.logger.verbose('transferCustomer inside `customerResolver`');
    return this.customerService.findAllCustomers(1).pipe(
      map(async customer => {
        const newCustomer = await this.customerRepository.migrationCreateCustomer(
          customer,
        );
        await this.commandBus.execute(
          new ChangeCustomerIdCommand(newCustomer.id, customer.id),
        );
        return newCustomer;
      }),
    );
  }

  @Mutation(returns => Customer)
  async createCustomer(
    @Args('createCustomerData') createCustomerData: CreateCustomerDto,
  ): Promise<Customer> {
    return await this.commandBus.execute(
      new CreateCustomerCommand(createCustomerData),
    );
  }

  @Mutation(returns => Customer)
  async updateCustomer(
    @Args('updateCustomerData') updateCustomerData: PatchCustomerDto,
  ): Promise<Customer> {
    return await this.commandBus.execute(
      new UpdateCustomerCommand(updateCustomerData),
    );
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    this.logger.verbose('resolve referense inside `Customer resolver`');
    return await this.customerRepository.findOne(reference.id);
  }
}
