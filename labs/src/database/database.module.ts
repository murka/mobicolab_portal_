import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule, GraphQLFederationModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('TYPEORM_HOST_DOCKER'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        migrationsRun: true,
        migrations: [configService.get('TYPEORM_MIGRATIONS')],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    GraphQLFederationModule.forRoot({
      installSubscriptionHandlers: false,
      uploads: false,
      autoSchemaFile: true,
      debug: true,
      playground: true,
      formatError: e => e,
    }),
  ],
})
export class DatabaseModule {}
