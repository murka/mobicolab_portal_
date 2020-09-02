import { Module } from '@nestjs/common';
import { DocController } from './doc/doc.controller';
import { DocService } from './doc/doc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocRepository } from './doc/doc.repository';
import { Doc } from './models/doc.model';
import { ActsModule } from '../acts/acts.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Doc, DocRepository]),
    ActsModule,
  ],
  controllers: [DocController],
  providers: [DocService],
})
export class FilesModule {}
