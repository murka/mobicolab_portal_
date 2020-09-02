import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50053',
    package: 'customer_service',
    protoPath: '/proto/customer/customer.proto',
  },
};
