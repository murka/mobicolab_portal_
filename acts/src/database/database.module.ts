import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { Customer } from '../modules/acts/models/customer.model';

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
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: [Customer],
      },
      debug: true,
      playground: true,
    }),
  ],

})
export class DatabaseModule {}
