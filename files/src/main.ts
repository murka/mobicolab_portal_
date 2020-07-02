import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload';

const configService = new ConfigService();

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('nestapi');

  app.use(graphqlUploadExpress({maxFieldSize: 1000000, maxFiles: 10,}))

  const port = configService.get('PORT')
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
