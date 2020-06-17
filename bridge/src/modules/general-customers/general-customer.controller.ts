import { Controller, Logger } from '@nestjs/common';
import { GeneralCustomersService } from './general-customers.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, ReplaySubject, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

@Controller()
export class GeneralCustomerController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly gcService: GeneralCustomersService) {}

  @GrpcMethod('GeneralCustomerService')
  findAllGeneralCustomers(): Observable<any[]> {
    let gs$ = new ReplaySubject<any>();
    this.gcService
      .findAllGCustomers()
      .then(async gcs => {
        for await (let gc of gcs) {
          this.logger.verbose('add next');
          gs$.next(gc);
        }
        this.logger.verbose('complete next');
        gs$.complete();
      })
      .catch(e => this.logger.error(e));
    return gs$.pipe(concatMap(v => of(v).pipe(delay(2000))));
  }
}
