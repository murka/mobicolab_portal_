import { Logger } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { CustomerRepository } from './customer.repository';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerDto } from './models/dto/create-customer.dto';
import { CreateCustomerCommand } from './commands/impl/create-customer.command';
import { PatchCustomerDto } from './models/dto/patch-customer.dto';
import { UpdateCustomerCommand } from './commands/impl/update-customer.command';
import { GetCustomerQuery } from './queries/impl/get-customer.query';
import { GetCustomersQuery } from './queries/impl/get-customers.query';

@Resolver(of => Customer)
export class CustomerResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(returns => [Customer])
  async getCustomers(): Promise<Customer[]> {
    this.logger.verbose('get-customers.query');
    return await this.queryBus.execute(new GetCustomersQuery());
  }

  @Query(returns => Customer)
  async customer(@Args('id') id: string): Promise<Customer> {
    return await this.queryBus.execute(new GetCustomerQuery(id));
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
    return await this.queryBus.execute(new GetCustomerQuery(reference.id));
  }
}

//   @Query(returns => Customer)
//   async transferCustomers() {
//     this.logger.verbose('transferCustomer inside `customerResolver`');
//     return this.customerService.findAllCustomers(1).pipe(
//       map(async customer => {
//         const newCustomer = await this.customerRepository.migrationCreateCustomer(
//           customer,
//         );
//         await this.commandBus.execute(
//           new ChangeCustomerIdCommand(newCustomer.id, customer.id),
//         );
//         return newCustomer;
//       }),
//     );
//   }
