import { Module, forwardRef, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { ActService } from './act.service';
import { ActRepository } from './act.repository';
import { HtypesModule } from '../htypes/htypes.module';
import { TypeOfSampleController } from './tos.controller';
import { CommandHandlers } from './commands/handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [TypeOfSampleController],
  imports: [
    CqrsModule,
    forwardRef(() => HtypesModule),
    TypeOrmModule.forFeature([Act, ActRepository]),
  ],
  providers: [ActService, ...CommandHandlers],
  exports: [ActService],
})
export class TypeOfSampleModule {}
