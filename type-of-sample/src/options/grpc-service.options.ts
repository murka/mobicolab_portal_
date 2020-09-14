import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50059',
    package: ['tos_service'],
    protoPath: ['/proto/tos/tos.proto'],
  },
};
