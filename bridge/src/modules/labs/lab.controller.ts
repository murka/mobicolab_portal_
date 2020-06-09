import { Controller, Logger } from '@nestjs/common';
import { LabsService } from './labs.service';
import { Observable, ReplaySubject, of } from 'rxjs';
import { GrpcMethod } from '@nestjs/microservices';
import { delay, concatMap } from 'rxjs/operators';

@Controller()
export class LabController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly labService: LabsService) {}

  @GrpcMethod('LabService')
  findAllLab(): Observable<any[]> {
    let labs$ = new ReplaySubject<any>();
    this.labService
      .findAllLabs()
      .then(async labs => {
        for await (let lab of labs) {
          this.logger.verbose('add next');
          labs$.next(lab);
        }
        this.logger.verbose('complete next');
        labs$.complete();
      })
      .catch(e => this.logger.error(e));
    return labs$.pipe(concatMap(v => of(v).pipe(delay(2000))));
  }
}
