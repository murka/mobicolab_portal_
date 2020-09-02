import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcBridgeClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_bridge:50050',
    package: 'customer',
    protoPath: join(__dirname, './protos/customer.proto'),
  },
};