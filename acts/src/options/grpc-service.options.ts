import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50052',
    package: ['act_service'],
    protoPath: ['/proto/act/act.proto'],
  },
};
