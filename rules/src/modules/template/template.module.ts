import { Module } from '@nestjs/common';
import { TemplateResolver } from './template.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTypeOfSampleTemplateModel } from './models/lab-type-of-sample.model';
import { LabTypeTemplateRepository } from './template.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      LabTypeOfSampleTemplateModel,
      LabTypeTemplateRepository,
    ]),
  ],
  providers: [TemplateResolver, ...QueryHandlers],
})
export class TemplateModule {}
