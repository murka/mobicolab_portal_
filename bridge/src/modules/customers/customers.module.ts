import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { customerSchema } from './customer.schema';
import { CustomerController } from './customer.controller';
import { CustomersService } from './customers.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'customer', schema: customerSchema }]),
    ],
    controllers: [
        CustomerController,
    ],
    providers: [CustomersService],
})
export class CustomersModule {}
