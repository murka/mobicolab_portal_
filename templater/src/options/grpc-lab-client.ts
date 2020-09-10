import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcLabClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_labs:50055',
    package: 'lab_service',
    protoPath: '/proto/lab/lab.proto',
  },
};
