import { Module } from '@nestjs/common';
import { GenralCustomersModule } from './modules/genral-customers/genral-customers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), GenralCustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
