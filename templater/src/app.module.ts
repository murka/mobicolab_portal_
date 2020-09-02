import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ActModule } from './modules/act/act.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ActModule,
  ],
})
export class AppModule {}
