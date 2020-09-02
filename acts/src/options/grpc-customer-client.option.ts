import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcCustomerClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_customers:50053',
    package: 'migration',
    protoPath: join(__dirname, './protos/migration.proto'),
  },
};