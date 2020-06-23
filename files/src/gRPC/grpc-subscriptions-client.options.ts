import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcSubscriptionsClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_subscriptions:50056',
    package: ['subscriptions'],
    protoPath: [join(__dirname, './protos/subscriptions.proto') ]
  },
};