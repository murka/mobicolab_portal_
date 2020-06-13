import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddActsReferencesCommand } from '../impl/add-acts-references.command';
import { Logger, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, of } from 'rxjs';
import { ActRepository } from '../../act.repository';
import { concatMap, delay } from 'rxjs/operators';
import { Act } from '../../models/act.model';

interface CustomerGrpcClient {
  addActsCusromerReference(
    data$: Observable<{ actId: string; customerId: string }>,
  ): Observable<void>;
}

@CommandHandler(AddActsReferencesCommand)
export class AddActsReferencesHandler
  implements ICommandHandler<AddActsReferencesCommand>, OnModuleInit {
  logger = new Logger(this.constructor.name);

  private customerGrpcClient: CustomerGrpcClient;

  constructor(
    @Inject('CUSTOMER_PACKAGE') private readonly client: ClientGrpc,
    private readonly actRepository: ActRepository,
  ) {}

  onModuleInit() {
    this.customerGrpcClient = this.client.getService<CustomerGrpcClient>(
      'MigrationService',
    );
  }

  async execute(): Promise<Act[]> {
    this.logger.verbose('add-acts-references.command');

    try {
      const acts = await this.actRepository.find({ relations: ['customer'] });
      this.logger.verbose(`all acts ${JSON.stringify(acts, null, 2)}`)
      const acts$ = acts.map(act => {
        const mapAct: { actId: string, customerId: string | null } =
        {actId: act.id, customerId: act.customer? act.customer.id : null}
        return mapAct
      });

      this.logger.log(`${JSON.stringify(acts$, null, 2)}`);

      let data$ = new ReplaySubject<any>();

      for await (let act of acts$) {
        data$.next(act);
        this.logger.log(act)
      }
      data$.complete();

      this.customerGrpcClient.addActsCusromerReference(
        data$.pipe(concatMap(v => of(v).pipe(delay(2000)))),
      ).subscribe(() => this.logger.log('start'))

      return acts
    } catch (e) {
      this.logger.error(e);
    }
  }
}
