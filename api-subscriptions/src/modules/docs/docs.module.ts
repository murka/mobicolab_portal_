import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import { DocsResolver } from './docs.resolver';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    DocsService,
    DocsResolver,
  ],
  controllers: [DocsController],
})
export class DocsModule {}
