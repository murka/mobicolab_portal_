import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50055',
    package: 'migration',
    protoPath: join(__dirname, './protos/migration.proto'),
  },
};