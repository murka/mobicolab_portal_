import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcFilesClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_files:50051',
    package: 'files_service',
    protoPath: '/proto/files/files.proto',
  },
};
