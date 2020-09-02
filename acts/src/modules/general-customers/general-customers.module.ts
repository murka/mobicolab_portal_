import { Module } from '@nestjs/common';
import { GeneralCustomersService } from './general-customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralCustomer } from './models/general-customer.model';
import { GCustomerRepository } from './general-customers.repositroy';
import { GCustomerResolver } from './general-customers.resolver';
import { GeneralCustomersController } from './general-customers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralCustomer, GCustomerRepository])],
  providers: [GeneralCustomersService, GCustomerResolver],
  exports: [GeneralCustomersService],
  controllers: [GeneralCustomersController],
})
export class GeneralCustomersModule {}
