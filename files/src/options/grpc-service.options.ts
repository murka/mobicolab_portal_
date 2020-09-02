import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: ['template', 'files', 'files_service'],
    protoPath: [
      join(__dirname, './protos/template.proto'),
      join(__dirname, '../../../proto/files.proto'),
      '/proto/files/files.proto',
    ],
  },
};
