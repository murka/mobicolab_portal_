import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { KafkaClientOptions } from './options/kafka.client.options';
import { MicroserviceOptions } from '@nestjs/microservices';

const configService = new ConfigService();

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const kafkaService = app.get(KafkaClientOptions);

  app.connectMicroservice<MicroserviceOptions>(kafkaService.kafkaClientOptions);

  await app.startAllMicroservicesAsync();

  app.enableCors();

  const port = configService.get('PORT');

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
