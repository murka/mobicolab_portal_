import { Module, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { TemplatePreviewModule } from './template-preview/template-preview.module';
import FileUploadDataSource from './file-upload-data-source'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // GraphQLGatewayModule.forRoot({
    //   server: {
    //     cors: true,
    //     installSubscriptionHandlers: false,
    //     introspection: true,
    //     uploads: false,
    //     playground: true,
    //     formatError: e => {
    //       return new HttpException(
    //         { status: e.name, error: e.message },
    //         HttpStatus.BAD_GATEWAY,
    //       );
    //     },
    //   },
    //   gateway: {
    //     logger: { info: console.info, error: console.error, debug: console.debug, warn: console.warn, },
    //     buildService: ({ url }) => new FileUploadDataSource({ url }),
    //     serviceList: [
    //       { name: 'acts', url: 'http://api-acts:3020/graphql' },
    //       { name: 'customers', url: 'http://api-customers:3030/graphql' },
    //       {
    //         name: 'gcustomers',
    //         url: 'http://api-general-customers:3040/graphql',
    //       },
    //       { name: 'labs', url: 'http://api-labs:3050/graphql' },
    //       { name: 'files', url: 'http://api-files:3010/graphql' },
    //     ],
    //   },
    // }),
    TemplatePreviewModule,
    // GraphQLGatewayModule.forRootAsync({
    //   useFactory: () => ({
    //     server: {
    //       cors: true,
    //       installSubscriptionHandlers: false,
    //       introspection: true,
    //       uploads: false,
    //       playground: true,
    //       formatError: e => {
    //         return new HttpException(
    //           { status: e.name, error: e.message },
    //           HttpStatus.BAD_GATEWAY,
    //         );
    //       },
    //     },
    //     gateway: {
    //       logger: { info: console.info, error: console.error, debug: console.debug, warn: console.warn },
    //       buildService: ({ url }) => new FileUploadDataSource({ url }),
    //       serviceList: [
    //         { name: 'acts', url: 'http://api_acts:3002/graphql' },
    //         { name: 'customers', url: 'http://api_customers:3003/graphql' },
    //         {
    //           name: 'gcustomers',
    //           url: 'http://api_general_customers:3004/graphql',
    //         },
    //         { name: 'labs', url: 'http://api_labs:3005/graphql' },
    //         { name: 'files', url: 'http://api_files:3001/graphql' },
    //       ],
          
    //     },
    //   })
    // })
  ],
})
export class AppModule {}
