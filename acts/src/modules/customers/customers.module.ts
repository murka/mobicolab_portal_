import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './models/customer.model';
import { CustomerRepository } from './customers.repository';
import { CustomerResolver } from './customers.resolver';
import { CustomersController } from './customers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerRepository])],
  providers: [CustomersService, CustomerResolver],
  exports: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
