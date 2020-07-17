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
import { grpcClientOptions } from 'src/gRPC/grpc-client.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocRepository, DocEventRepository } from './doc.repository';
import { Doc, DocEvent } from './models/doc.model';
import { grpcSubscriptionsClientOptions } from 'src/gRPC/grpc-subscriptions-client.options';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Doc,
      // Act,
      DocRepository,
      // ActRepository,
      DocEvent,
      DocEventRepository,
    ]),
    ClientsModule.register([
      {
        name: 'ACT_PACKAGE',
        ...grpcClientOptions,
      },
      {
        name: 'SUBSCRIPTIONS_PACKAGE',
        ...grpcSubscriptionsClientOptions,
      }
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
    DocsResolver,
    ...CommandHandlers,
    ...EventHandlers,
    DocSagas,
  ],
})
export class DocsModule {}
