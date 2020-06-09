import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { actSchema } from './act.schema';
import { ActsController } from './acts.controller';
import { ActsService } from './acts.service';
import { customerSchema } from '../customers/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'act', schema: actSchema },
      { name: 'customer', schema: customerSchema },
    ]),
  ],
  controllers: [ActsController],
  providers: [ActsService],
})
export class ActsModule {}
