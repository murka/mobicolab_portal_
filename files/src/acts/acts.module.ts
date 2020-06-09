import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DocsModule } from './docs/docs.module';

import { actSchema } from './models/act.schema';
import { customerSchema } from './customer/customer.schema';
import { gcustomerSchema } from './general-customer/gcustomer.schema';
import { labSchema } from './lab/lab.schema';

import { CustomerController } from './customer/customer.controller';
import { GeneralCustomerController } from './general-customer/general-customer.controller';
import { LabController } from './lab/lab.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'act', schema: actSchema }]),
    MongooseModule.forFeature([{ name: 'customer', schema: customerSchema }]),
    MongooseModule.forFeature([{ name: 'gcustomer', schema: gcustomerSchema }]),
    MongooseModule.forFeature([{ name: 'lab', schema: labSchema }]),
    DocsModule,
  ],
  controllers: [
    CustomerController,
    GeneralCustomerController,
    LabController,
  ],
  
})
export class ActsModule {}
