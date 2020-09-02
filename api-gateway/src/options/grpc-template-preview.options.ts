import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const k8s = 'api-files-cluster-ip-service:50051';
const docker = 'api_files:50051';

export const grpcTemplatePreviewOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: docker,
    package: 'template',
    protoPath: join(__dirname, './protos/template.proto'),
  },
};
