import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50055',
    package: 'lab_service',
    protoPath: '/proto/lab/lab.proto',
  },
};
