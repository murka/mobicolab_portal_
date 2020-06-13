import { Controller, Logger } from '@nestjs/common';
import { GrpcStreamMethod, GrpcMethod } from '@nestjs/microservices';
import { Observable, of, ReplaySubject } from 'rxjs';
import { ActsService } from './acts.service';
import { delay, concatMap, toArray } from 'rxjs/operators';

@Controller()
export class ActsController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actsService: ActsService) {}

  @GrpcMethod('ActsService')
  findAllActs(): Observable<any> {
    let acts$ = new ReplaySubject<any>();
    this.actsService
      .findAllActs()
      .then(async acts => {
        for await (let act of acts) {
          this.logger.verbose(`add next: ${act}`);
          acts$.next(act);
        }
        this.logger.verbose('complete next');
        acts$.complete();
      })
      .catch(e => this.logger.error(e));
    return acts$.pipe(concatMap(v => of(v).pipe(delay(2000))));
  }
}
