import { Module } from '@nestjs/common';
import { TypeOfSampleModule } from './modules/type-of-sample/type-of-sample.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TypeOfSampleModule,
  ],
})
export class AppModule {}
