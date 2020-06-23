import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { DocsModule } from './modules/docs/docs.module'
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    DocsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
  ],
})
export class AppModule {}
