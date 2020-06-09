import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ActsModule } from './modules/acts/acts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from './modules/acts/models/lab.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ActsModule,
  ],
  // exports: [DatabaseModule]
})
export class AppModule {}
