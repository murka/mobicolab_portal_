import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: ['template', 'files_service'],
    protoPath: [
      join(__dirname, './protos/template.proto'),
      '/proto/files/files.proto',
    ],
  },
};
