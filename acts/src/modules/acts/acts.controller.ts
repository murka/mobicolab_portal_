import { Controller, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Act as ActModel } from './models/act.model';
import {
  actId,
  Act,
  ActServiceControllerMethods,
  ActServiceController,
  ActToFile,
} from 'src/models/build/act/act';
import { GetActQuery } from './queries/impl/get-act.query';
import { TypeOfSample } from '../type-of-sample/models/type-of-sample.model';
import { GetTOSQuery } from '../type-of-sample/queries/impl/get-tos.query';

export interface ChangeIdDto {
  newId: string;
  oldId: string;
}

@Controller('acts')
@ActServiceControllerMethods()
export class ActsController implements ActServiceController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly qeueryBus: QueryBus) {}

  async getAct(data: actId): Promise<Act> {
    this.logger.verbose('get-act.grpc-method');

    try {
      const act: ActModel = await this.qeueryBus.execute(
        new GetActQuery(data.id),
      );

      const tos: TypeOfSample = await this.qeueryBus.execute(
        new GetTOSQuery(act.typeOfSample.id),
      );

      return {
        ...act,
        datetime: {
          date: act.datetime.date.toISOString(),
          time: act.datetime.time,
        },
        customer: act.customer.id,
        generalCustomer: act.generalCustomer.id,
        obName: act.objectName,
        lab: act.lab.id,
        typeOfSample: {
          habitan: tos.habitan.id,
          htypes: tos.htype.id,
        },
        applications: [
          ...act.applications.map(app => {
            return {
              ...app,
              datetime: {
                ...app.datetime,
                date: app.datetime.date.toISOString(),
              },
            };
          }),
        ],
      } as Act;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getActToFile(data: actId): Promise<ActToFile> {
    this.logger.verbose(`get-act-to-file.method ${data.id}`);

    try {
      const act: ActModel = await this.qeueryBus.execute(
        new GetActQuery(data.id),
      );

      const newact = {
        name: act.name,
        datetime: {
          date: act.datetime.date.toISOString(),
          time: act.datetime.time,
        },
        customer: act.customer.id,
        generalCustomer: act.generalCustomer.id,
        lab: act.lab.id,
      } as ActToFile;

      this.logger.log(newact)

      return newact;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}

//   @GrpcMethod('MigrationService', 'MigrationCustomer')
//   async migrationCustomer(data: ChangeIdDto): Promise<any> {
//     this.logger.verbose('migration-customer inside `grpcMethod`');

//     await this.commandBus.execute(new ChangeCustomerIdCommand(data));

//     return { respon: 'success' };
//   }

//   @GrpcMethod('MigrationService')
//   async migrationGeneralCustomer(data: ChangeIdDto): Promise<any> {
//     this.logger.verbose('migration-gcustomer inside `grpcMethod`');

//     await this.commandBus.execute(new ChangeGeneralCustomerIdCommand(data));

//     return { respon: 'success' };
//   }

//   @GrpcMethod('MigrationService')
//   async migrationLab(data: ChangeIdDto): Promise<any> {
//     this.logger.verbose('migration-lab indsede `grpcMethod`');

//     await this.commandBus.execute(new ChangeLabIdCommand(data));

//     return { respon: 'success' };
//   }
