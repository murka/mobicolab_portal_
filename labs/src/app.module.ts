import { Module } from '@nestjs/common';
import { LabsModule } from './modules/labs/labs.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LabsModule,
    DatabaseModule
  ],
})
export class AppModule {}
