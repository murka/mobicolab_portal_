import { Module } from '@nestjs/common';
// import { ActResolver } from './act.resolver';
import { CustomerResolver } from './customer.resolver';
import { ActRepository, CustomerRepository, EventRepository } from './customer.repository';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './models/customer.model';
import { Act } from './models/act.model';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsHandlers } from './commands/handlers';
import { grpcBridgeClientOptions } from 'src/gRPC/grpc-bridge-client.options';
import { grpcActsClientOptions } from 'src/gRPC/grpc-acts-client.options';
import { CustomersController } from './customers.controller';
import { EvnetHandlers } from './events/handlers';
import { CustomerEvent } from './models/customer-event.model';
import { CustomersService } from './customers.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Customer,
      Act,
      CustomerEvent,
      CustomerRepository,
      ActRepository,
      EventRepository,
    ]),
    ClientsModule.register([
      {
        name: 'BRIDGE_PACKAGE',
        ...grpcBridgeClientOptions,
      },
      {
        name: 'ACTS_PACKAGE',
        ...grpcActsClientOptions,
      },
    ]),
  ],
  providers: [
    // ActResolver,
    CustomerResolver,
    ...CommandsHandlers,
    ...EvnetHandlers,
    CustomersService,
  ],
  controllers: [CustomersController],
})
export class CustomersModule {}
