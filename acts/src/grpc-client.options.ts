import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_bridge:5000',
    package: 'act',
    protoPath: join(__dirname, 'modules/acts/models/act.proto'),
  },
};
