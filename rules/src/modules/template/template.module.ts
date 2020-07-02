import { Module } from '@nestjs/common';
import { TemplateResolver } from './template.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTypeOfSampleTemplateModel } from './models/lab-type-of-sample.model';
import { LabTypeTemplateRepository } from './template.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    LabTypeOfSampleTemplateModel,
    LabTypeTemplateRepository,
  ])],
  providers: [TemplateResolver]
})
export class TemplateModule {}
