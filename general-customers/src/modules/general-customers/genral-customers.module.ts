import { Module } from '@nestjs/common';
import { ActResolver } from './act.resolver';
import {
  GeneralCustomerRepository,
  ActRepository,
} from './general-customer.repository';
import { GeneralCustomerResolver } from './general-customer.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../../gRPC/grpc-general-customer-client.options';
import { grpcActsClientOptions } from 'src/gRPC/grpc-acts-client.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralCustomer } from './models/general-customer.model';
import { Act } from './models/act.model';
import { GeneralCustomersController } from './general-customers.controller';
import { CommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { EvnetHandlers } from './events/handlers';

@Module({
  imports: [
      CqrsModule,
      TypeOrmModule.forFeature([
          GeneralCustomer,
          Act,
          GeneralCustomerRepository,
          ActRepository,
      ]),
    ClientsModule.register([
      {
        name: 'BRIDGE_PACKAGE',
        ...grpcClientOptions,
      },
      {
          name: 'ACTS_PACKAGE',
          ...grpcActsClientOptions
      }
    ]),
  ],
  providers: [
    ActResolver,
    GeneralCustomerResolver,
    ...CommandHandlers,
    ...EvnetHandlers
  ],
  controllers: [GeneralCustomersController],
})
export class GenralCustomersModule {}
