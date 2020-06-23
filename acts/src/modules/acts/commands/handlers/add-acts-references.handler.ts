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
    data$: Observable<{ actId: string; contractorId: string }>,
  ): Observable<void>;
}

interface GCustomerGrpcClient {
  addActsGeneralCusromerReference(
    data$: Observable<{ actId: string; contractorId: string }>,
  ): Observable<void>;
}

interface LabGrpcClient {
  addActsLabReference(
    data$: Observable<{ actId: string; contractorId: string }>,
  ): Observable<void>;
}

@CommandHandler(AddActsReferencesCommand)
export class AddActsReferencesHandler
  implements ICommandHandler<AddActsReferencesCommand>, OnModuleInit {
  logger = new Logger(this.constructor.name);

  private customerGrpcClient: CustomerGrpcClient;
  private gcustomerGrpcClient: GCustomerGrpcClient;
  private labGrpcClient: LabGrpcClient;

  constructor(
    @Inject('CUSTOMER_PACKAGE') private readonly customerClient: ClientGrpc,
    @Inject('GCUSTOMER_PACKAGE') private readonly gCustomerClient: ClientGrpc,
    @Inject('LAB_PACKAGE') private readonly labClient: ClientGrpc,
    private readonly actRepository: ActRepository,
  ) {}

  onModuleInit() {
    this.customerGrpcClient = this.customerClient.getService<
      CustomerGrpcClient
    >('MigrationService');
    this.gcustomerGrpcClient = this.gCustomerClient.getService<
      GCustomerGrpcClient
    >('MigrationService');
    this.labGrpcClient = this.labClient.getService<LabGrpcClient>(
      'MigrationService',
    );
  }

  async execute(): Promise<Act[]> {
    this.logger.verbose('add-acts-references.command');

    try {
      const acts = await this.actRepository.find({
        relations: ['customer', 'general_customer', 'lab'],
      });

      const actsWithCustomer = acts.map(act => {
        const mapAct: { actId: string; contractorId: string | null } = {
          actId: act.id,
          contractorId: act.customer ? act.customer.id : null,
        };
        return mapAct;
      });

      const actsWithGCustoemer = acts.map(act => {
        const mapAct: { actId: string; contractorId: string | null } = {
          actId: act.id,
          contractorId: act.general_customer.id,
        };
        return mapAct;
      });

      const actsWithLab = acts.map(act => {
        const mapAct: { actId: string; contractorId: string | null } = {
          actId: act.id,
          contractorId: act.lab.id,
        };
        return mapAct;
      });

      let customerData$ = new ReplaySubject<any>();
      let gcustomerData$ = new ReplaySubject<any>();
      let labData$ = new ReplaySubject<any>();

      for await (let act of actsWithCustomer) {
        customerData$.next(act);
      }
      customerData$.complete();

      this.customerGrpcClient
        .addActsCusromerReference(
          customerData$.pipe(concatMap(v => of(v).pipe(delay(2000)))),
        )
        .subscribe(() => this.logger.log('start customer'));

      for await (let act of actsWithGCustoemer) {
        gcustomerData$.next(act);
      }
      gcustomerData$.complete();

      this.gcustomerGrpcClient
        .addActsGeneralCusromerReference(
          gcustomerData$.pipe(concatMap(v => of(v).pipe(delay(2000)))),
        )
        .subscribe(() => this.logger.log('start gcustomer'));

      for await (let act of actsWithLab) {
        labData$.next(act)
      }
      labData$.complete();

      this.labGrpcClient.addActsLabReference(
        labData$.pipe(concatMap(v => of(v).pipe(delay(2000)))),
      ).subscribe(() => this.logger.log('start lab'));

      return acts;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
