import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import { DocsResolver } from './docs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doc, DocEvent } from './models/doc.model';
import { DocRepository } from './doc.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Doc, DocRepository, DocEvent])],
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
