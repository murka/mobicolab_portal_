import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcActsClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_acts:50052',
    package: 'migration',
    protoPath: join(__dirname, './protos/migration.proto'),
  },
};