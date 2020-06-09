import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { GeneralCustomer } from './models/general-customer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger, Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralCustomerRepository } from './general-customer.repository';
import { ClientGrpc } from '@nestjs/microservices';

interface GCustomerService {
  findAllGeneralCustomers(data: number): Observable<GeneralCustomer>;
}

@Resolver(of => GeneralCustomer)
export class GeneralCustomerResolver implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private gcustomerService: GCustomerService;

  constructor(
    @InjectRepository(GeneralCustomerRepository)
    private readonly gcustomerRepository: GeneralCustomerRepository,
    @Inject('GCUSTOMER_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  @Query(returns => [GeneralCustomer])
  async customers(): Promise<GeneralCustomer[]> {
    return await this.gcustomerRepository.findAll();
  }

  @Query(returns => GeneralCustomer)
  async customer(@Args('id') id: string): Promise<GeneralCustomer> {
    return await this.gcustomerRepository.findGCustomer(id);
  }

  @Query(returns => GeneralCustomer)
  transformGCustomers(): Observable<GeneralCustomer> {
    return this.gcustomerService.findAllGeneralCustomers(1).pipe(
      map(gcustomer => {
        const newGCustomer = this.gcustomerRepository.createGenerlaCustomer(
          gcustomer,
        );
        this.logger.verbose(newGCustomer);
        return newGCustomer;
      }),
    );
  }

  @ResolveReference()
  async resolverReference(reference: { __typename: string, id: string }) {
      return await this.gcustomerRepository.findGCustomer(reference.id)
  }

  onModuleInit() {
      this.gcustomerService = this.client.getService<GCustomerService>('GeneralCustomerService')
  }
}
