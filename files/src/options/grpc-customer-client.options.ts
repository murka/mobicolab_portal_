import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcCustomerClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_customers:50053',
    package: 'customer_service',
    protoPath: '/proto/customer/customer.proto',
  },
};
