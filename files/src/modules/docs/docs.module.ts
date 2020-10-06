import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsResolver } from './docs.resolver';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { DocSagas } from './sagas/doc.sagas';
import { CqrsModule } from '@nestjs/cqrs';
import { WebDAVModule } from 'nestjs-webdav';
import { DocsController } from './docs.controller';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DocRepository,
  DocEventRepository,
} from './repositories/doc.repository';
import { Doc } from './models/doc.model';
import { grpcSubscriptionsClientOptions } from 'src/options/grpc-subscriptions-client.options';
import { Act } from './models/act.model';
import { ActRepository } from './repositories/act.repository';
import { DocEvent } from './models/doc-event.model';
import { QueryHandlers } from './queries/handlers';
import { SynService } from './syn.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Doc,
      Act,
      DocRepository,
      ActRepository,
      DocEvent,
      DocEventRepository,
    ]),
    CqrsModule,
    WebDAVModule.forRoot({
      config: {
        endpoint: 'https://webdav.yandex.ru:443',
        username: 'Rom4755',
        password: 'Tick4952',
      },
    }),
  ],
  controllers: [DocsController],
  providers: [
    DocsService,
    SynService,
    DocsResolver,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    DocSagas,
  ],
})
export class DocsModule {}
