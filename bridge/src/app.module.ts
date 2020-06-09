import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { ActsModule } from './modules/acts/acts.module';
import { CustomersModule } from './modules/customers/customers.module';
import { GeneralCustomersModule } from './modules/general-customers/general-customers.module';
import { LabsModule } from './modules/labs/labs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ActsModule,
    CustomersModule,
    GeneralCustomersModule, 
    LabsModule
  ],
})
export class AppModule {}
