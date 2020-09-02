import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcTemplatePreviewOptions } from 'src/options/grpc-template-preview.options';
import { TemplatePreviewController } from './template-preview.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEMPLATE_PREVIEW_PACKAGE',
        ...grpcTemplatePreviewOptions,
      },
    ]),
  ],
  controllers: [TemplatePreviewController],
})
export class TemplatePreviewModule {}
