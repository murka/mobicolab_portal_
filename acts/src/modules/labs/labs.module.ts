import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabResolver } from './labs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from './models/lab.model';
import { LabRepository } from './labs.repositroy';
import { LabsController } from './labs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lab, LabRepository])],
  providers: [LabsService, LabResolver],
  exports: [LabsService],
  controllers: [LabsController],
})
export class LabsModule {}
