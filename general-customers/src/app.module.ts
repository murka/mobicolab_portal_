import { Module } from '@nestjs/common';
import { GenralCustomersModule } from './modules/general-customers/genral-customers.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GenralCustomersModule,
    DatabaseModule,
  ],
})
export class AppModule {}
