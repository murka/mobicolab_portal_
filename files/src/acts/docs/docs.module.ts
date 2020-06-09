import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsResolver } from './docs.resolver';
import { PrismaService } from 'src/services/prisma.service';
import { PubSub } from 'graphql-subscriptions';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { DocSagas } from './sagas/doc.sagas';
import { CqrsModule } from '@nestjs/cqrs';
import { WebDAVModule } from 'nestjs-webdav';
import { MongooseModule } from '@nestjs/mongoose';
import { actSchema } from '../models/act.schema';
import { customerSchema } from '../customer/customer.schema';
import { gcustomerSchema } from '../general-customer/gcustomer.schema';
import { labSchema } from '../lab/lab.schema';
import { DocsController } from './docs.controller';

@Module({
  imports: [
    CqrsModule,
    WebDAVModule.forRoot({
      config: {
        endpoint: 'https://webdav.yandex.ru:443',
        username: 'Rom4755',
        password: 'Tick4952',
      },
    }),
    MongooseModule.forFeature([{ name: 'act', schema: actSchema }]),
    MongooseModule.forFeature([{ name: 'customer', schema: customerSchema }]),
    MongooseModule.forFeature([{ name: 'gcustomer', schema: gcustomerSchema }]),
    MongooseModule.forFeature([{ name: 'lab', schema: labSchema }]),
  ],
  controllers: [
    DocsController,
  ],
  providers: [
    DocsService,
    DocsResolver,
    PrismaService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    ...CommandHandlers,
    ...EventHandlers,
    DocSagas,
  ],
})
export class DocsModule {}
