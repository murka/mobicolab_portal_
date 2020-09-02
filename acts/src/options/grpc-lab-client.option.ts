import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcLabClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_labs:50055',
    package: 'migration',
    protoPath: join(__dirname, './protos/migration.proto'),
  },
};