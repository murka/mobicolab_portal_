import { Inject, OnModuleInit, Logger } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './models/customer.model';
import { CustomerRepository } from './customer.repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientGrpc } from '@nestjs/microservices';
// import { Act } from './models/act.model';

interface CustomerService {
  findAllCustomers(data: number): Observable<Customer>;
}

@Resolver(of => Customer)
export class CustomerResolver implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private customerService: CustomerService;

  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
    @Inject('CUSTOMER_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.logger.verbose('inside onModuleInit')
    // this.customerService = this.client.getService<CustomerService>(
    //   'CustomerService',
    // );
    this.customerService = this.client.getClientByServiceName<CustomerService>('CustomerService')
  }

  @Query(returns => [Customer])
  async customers(): Promise<Customer[]> {
    return await this.customerRepository.findAll();
  }

  @Query(returns => Customer)
  async customer(@Args('id') id: string): Promise<Customer> {
    return await this.customerRepository.findCustomer(id);
  }

  @Query(returns => Customer)
  transferCustomers(): Observable<Customer> {
    return this.customerService.findAllCustomers(1).pipe(
      map(customer => {
        const newCustomer = this.customerRepository.createCustomer(customer);
        this.logger.verbose(newCustomer);
        return newCustomer;
      }),
    );
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return await this.customerRepository.findCustomer(reference.id);
  }

  // @ResolveField(of => [Act])
  // public acts(@Parent() customer: Customer) {
  //     return customer.acts.map(act => { __typename: "Act"; act.id })
  // }
}
