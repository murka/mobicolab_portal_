import { Module } from '@nestjs/common';
import { GenralCustomersModule } from './modules/general-customers/genral-customers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), GenralCustomersModule],
})
export class AppModule {}
