import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50020',
    package: ['template_preview', 'api_gateway_service'],
    protoPath: [
      join(__dirname, './protos/client/template-preview.proto'),
      '/proto/api-gateway/api-gateway.proto',
    ],
  },
};
