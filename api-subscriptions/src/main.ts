import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcServiceOptions } from './options/grpc-service.options';
import { KafkaClientOptions } from './options/kafka.client.options';

const configService = new ConfigService();

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = configService.get('PORT');

  const kafkaService = app.get(KafkaClientOptions);

  app.connectMicroservice<MicroserviceOptions>(kafkaService.kafkaClientOptions);

  await app.startAllMicroservicesAsync();

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
