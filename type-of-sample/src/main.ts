import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { KafkaClientOptions } from './options/kafka.client.options';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcServiceOptions } from './options/grpc-service.options';

const configService = new ConfigService();

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const kafkaService = app.get(KafkaClientOptions);
  
  app.connectMicroservice<MicroserviceOptions>(kafkaService.kafkaClientOptions);
  
  app.connectMicroservice<MicroserviceOptions>(grpcServiceOptions);
  
  await app.startAllMicroservicesAsync();
  
  const port = configService.get('PORT');

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
