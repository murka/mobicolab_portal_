import { Module, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { TemplatePreviewModule } from './modules/template-preview/template-preview.module';
import { FilesModule } from './modules/files/files.module';
import FileUploadDataSource from './file-upload-data-source';
import { KafkaClientOptions } from './options/kakfa-client.options';
import { ClientProxyFactory } from '@nestjs/microservices';

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
        // formatError: e => {
        //   return new HttpException(
        //     { status: e.name, error: e.message },
        //     HttpStatus.BAD_GATEWAY,
        //   );
        // },
      },
      gateway: {
        // logger: {
        //   info: console.info,
        //   error: console.error,
        //   debug: console.debug,
        //   warn: console.warn,
        // },
        // buildService: ({ url }) => new FileUploadDataSource({ url }),
      },
    }),
    TemplatePreviewModule,
    FilesModule,
  ],
  providers: [
    KafkaClientOptions,
    {
      provide: 'KAFKA_CLIENT',
      useFactory: async (kafkaClientOptions: KafkaClientOptions) => {
        const options = await kafkaClientOptions.getKafkaOptions();
        return ClientProxyFactory.create({ ...options });
      },
      inject: [KafkaClientOptions],
    },
  ],
})
export class AppModule {}
