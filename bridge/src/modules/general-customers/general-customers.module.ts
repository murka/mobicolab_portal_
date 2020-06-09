import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { gcustomerSchema } from './gcustomer.schema';
import { GeneralCustomerController } from './general-customer.controller';
import { GeneralCustomersService } from './general-customers.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'gcustomer', schema: gcustomerSchema }]),
    ],
    controllers: [
        GeneralCustomerController,
    ],
    providers: [GeneralCustomersService]
})
export class GeneralCustomersModule {}
