import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_acts:50052',
    package: 'act_doc',
    protoPath: join(__dirname, './protos/act-doc.proto'),
  },
};
