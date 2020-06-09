import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { PubSub } from 'graphql-subscriptions';

import { ActsModule } from './acts/acts.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ActsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
  ],
  // exports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
