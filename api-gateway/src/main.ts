import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcServiceOptions } from './options/grpc-service.options';
import { KafkaClientOptions } from './options/kakfa-client.options';

const configService = new ConfigService();

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const kafkaService = app.get(KafkaClientOptions);

  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>(grpcServiceOptions);

  app.connectMicroservice<MicroserviceOptions>(kafkaService.kafkaClientOptions);

  await app.startAllMicroservicesAsync();

  app.use(graphqlUploadExpress({ maxFieldSize: 1000000, maxFiles: 10 }));

  const port = configService.get<number>('PORT');

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
