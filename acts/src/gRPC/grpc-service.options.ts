import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50052',
    package: ['migration', 'act_doc'],
    protoPath: [join(__dirname, './protos/migration.proto'), join(__dirname, './protos/act-doc.proto')]
  },
};