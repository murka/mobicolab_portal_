import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcGCustomerClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_general_customers:50054',
    package: 'migration',
    protoPath: join(__dirname, './protos/migration.proto'),
  },
};