import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50054',
    package: 'gcustomer_service',
    protoPath: '/proto/general-customer/general-customer.proto',
  },
};
