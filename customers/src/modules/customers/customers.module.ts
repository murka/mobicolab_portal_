import { Module } from '@nestjs/common';
import { ActResolver } from './act.resolver';
import { CustomerResolver } from './customer.resolver';
import { ActRepository, CustomerRepository } from './customer.repository';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../../grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_PACKAGE',
        ...grpcClientOptions
      },
    ]),
  ],
  providers: [ActResolver, CustomerResolver, ActRepository, CustomerRepository],
})
export class CustomersModule {}
