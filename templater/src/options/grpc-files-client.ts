import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcFilesClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_files:50051',
    package: 'files_service',
    protoPath: '/proto/files/files.proto',
  },
};
