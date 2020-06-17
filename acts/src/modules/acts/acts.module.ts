import { Module } from '@nestjs/common';
import { ActResolver } from './act.resolver';
import {
  CustomerResolver,
  GCustomerResolver,
  LabResolver,
} from './references.resolver';
import { ActRepository } from './act.repository';
import {
  CustomerRepository,
  GCustomerRepository,
  LabRepository,
  EventRepository,
} from './references.repository';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../../gRPC/grpc-bridge-client.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { Customer } from './models/customer.model';
import { GeneralCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { ActsService } from './acts.service';
import { CommandHadlers } from './commands/handlers';
import { EventsHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { ActEvent } from './models/act-event.model';
import { ActsController } from './acts.controller';
import { grpcCustomerClientOptions } from 'src/gRPC/grpc-customer-client.option';
import { grpcGCustomerClientOptions } from 'src/gRPC/grpc-gcustomer-client.option';
import { grpcLabClientOptions } from 'src/gRPC/grpc-lab-client.option';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Act,
      Customer,
      GeneralCustomer,
      Lab,
      ActEvent,
      ActRepository,
      CustomerRepository,
      GCustomerRepository,
      LabRepository,
      EventRepository
    ]),
    ClientsModule.register([
      {
        name: 'ACT_PACKAGE',
        ...grpcClientOptions,
      },
      {
        name: 'CUSTOMER_PACKAGE',
        ...grpcCustomerClientOptions
      },
      {
        name: 'GCUSTOMER_PACKAGE',
        ...grpcGCustomerClientOptions
      },
      {
        name: 'LAB_PACKAGE',
        ...grpcLabClientOptions
      }
    ]),
  ],
  providers: [
    ActResolver,
    CustomerResolver,
    GCustomerResolver,
    LabResolver,
    ActsService,
    ...CommandHadlers,
    ...EventsHandlers
  ],
  controllers: [ActsController],
})
export class ActsModule {}
