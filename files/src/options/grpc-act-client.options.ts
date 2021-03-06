import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcActClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_acts:50052',
    package: 'act_service',
    protoPath: '/proto/act/act.proto',
  },
};
