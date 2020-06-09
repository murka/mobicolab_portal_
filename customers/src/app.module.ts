import { Module } from '@nestjs/common';
import { CustomersModule } from './modules/customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomersModule,
  ],
})
export class AppModule {}
