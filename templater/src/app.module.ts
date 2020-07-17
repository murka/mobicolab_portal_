import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LabTypeOfSampleModule } from './modules/lab-type-of-sample/lab-type-of-sample.module';
import { AstModule } from './modules/ast/ast.module';
import { ActModule } from './modules/act/act.module';

@Module({
  imports: [DatabaseModule, LabTypeOfSampleModule, AstModule, ActModule],
})
export class AppModule {}
