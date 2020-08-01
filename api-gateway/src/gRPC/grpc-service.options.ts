import { ClientOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const grpcServiceOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:50020',
        package: ['template_preview'],
        protoPath: [join(__dirname, './protos/client/template-preview.proto')]
    }
}