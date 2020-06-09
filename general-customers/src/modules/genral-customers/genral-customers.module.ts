import { Module } from '@nestjs/common';
import { ActResolver } from './act.resolver';
import { GeneralCustomerRepository, ActRepository } from './general-customer.repository';
import { GeneralCustomerResolver } from './general-customer.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../../grpc-client.options';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'GCUSTOMER_PACKAGE',
            ...grpcClientOptions
        }])
    ],
    providers: [ActResolver, GeneralCustomerRepository, ActRepository, GeneralCustomerResolver]
})
export class GenralCustomersModule {}
