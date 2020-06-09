import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { grpcOptions } from './grpc.options';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, grpcOptions);

  await app.listenAsync()

  logger.log(`Microservice is listening`);
}
bootstrap();
