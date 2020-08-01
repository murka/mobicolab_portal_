import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcTemplatePreviewOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: 'api-files-cluster-ip-service:50051',
        package: 'template_preview',
        protoPath: join(__dirname, './protos/template-preview.proto')
    }
}