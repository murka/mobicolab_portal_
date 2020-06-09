import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_bridge:5000',
    package: 'lab',
    protoPath: join(__dirname, 'modules/labs/models/lab.proto'),
  },
};