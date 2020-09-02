import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HType } from './models/habitans-type.model';
import {
  HabitansTypeRepository,
  HTypeEventRepository,
} from './habitans-type.repository';
import { HabitansTypeResolver } from './htype.resolver';
import { QueryHandlers } from './queries/handlers';
import { CommandHanlers } from './commands/handlers';
import { HabitansModule } from '../habitans/habitans.module';
import { EvnetHandlers } from './events/handlers';
import { HTypeEvent } from './models/habitans-types-event.model';
import { HtypesController } from './htypes.controller';
import { TypeOfSampleModule } from '../type-of-sample/type-of-sample.module';
import { HTypeService } from './htype.service';
import { ActService } from '../type-of-sample/act.service';

@Module({
  imports: [
    CqrsModule,
    HabitansModule,
    forwardRef(() => TypeOfSampleModule),
    TypeOrmModule.forFeature([
      HType,
      HabitansTypeRepository,
      HTypeEventRepository,
      HTypeEvent,
    ]),
  ],
  providers: [
    HTypeService,
    HabitansTypeResolver,
    ...QueryHandlers,
    ...CommandHanlers,
    ...EvnetHandlers,
  ],
  exports: [HTypeService],
  controllers: [HtypesController],
})
export class HtypesModule {}
