import { Module, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { TemplatePreviewModule } from './template-preview/template-preview.module';
import FileUploadDataSource from './file-upload-data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLGatewayModule.forRoot({
      server: {
        cors: true,
        installSubscriptionHandlers: false,
        introspection: true,
        uploads: false,
        playground: true,
        formatError: e => {
          return new HttpException(
            { status: e.name, error: e.message },
            HttpStatus.BAD_GATEWAY,
          );
        },
      },
      gateway: {
        // logger: {
        //   info: console.info,
        //   error: console.error,
        //   debug: console.debug,
        //   warn: console.warn,
        // },
        buildService: ({ url }) => new FileUploadDataSource({ url }),
      },
    }),
    TemplatePreviewModule,
  ],
})
export class AppModule {}
