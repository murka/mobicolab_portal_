import { Controller, Logger } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, ReplaySubject, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

@Controller()
export class CustomerController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly customerService: CustomersService) {}

  @GrpcMethod('CustomerService')
  findAllCustomers(): Observable<any[]> {
    let customers$ = new ReplaySubject<any>();

    this.customerService
      .findAllCustomers()
      .then(async customers => {
        for await (let customer of customers) {
          this.logger.verbose('add next');
          customers$.next(customer);
        }
        this.logger.verbose('complete next');
        customers$.complete();
      })
      .catch(e => this.logger.error(e));
      return customers$.pipe(concatMap(v => of(v).pipe(delay(2000))));
  }
}
