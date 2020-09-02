import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { grpcServiceOptions } from './options/grpc-service.option';
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

  const port = configService.get('PORT');

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
