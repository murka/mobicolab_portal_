import { Module } from '@nestjs/common';
import { ActResolver } from './act.resolver';
import {
  CustomerResolver,
  GCustomerResolver,
  LabResolver,
} from './referens.resolver';
import {
  ActRepository,
  CustomerRepository,
  GCustomerRepository,
} from './act.repository';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-client.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { Customer } from './models/customer.model';
import { GCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { ActsService } from './acts.service';
import { LabRepository } from './lab.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Act,
      Customer,
      GCustomer,
      Lab,
      ActRepository,
      CustomerRepository,
      GCustomerRepository,
      LabRepository
    ]),
    ClientsModule.register([
      {
        name: 'ACT_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [
    ActResolver,
    CustomerResolver,
    LabResolver,
    ActsService,
  ],
})
export class ActsModule {}
