import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcTOSClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_tos:50059',
    package: 'tos_service',
    protoPath: '/proto/tos/tos.proto',
  },
};
