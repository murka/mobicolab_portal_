import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitan } from './models/habitan.model';
import {
  HabitanRepository,
  HabitanEventRepository,
} from './habitan.repository';
import { HabitanResolver } from './habitan.resolver';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { HtypesModule } from '../htypes/htypes.module';
import { EvnetHandlers } from './events/handlers';
import { HabitanEvent } from './models/habitan-events.model';
import { HabitansController } from './habitans.controller';
import { TypeOfSampleModule } from '../type-of-sample/type-of-sample.module';
import { HabitanService } from './habitan.service';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => TypeOfSampleModule),
    TypeOrmModule.forFeature([
      Habitan,
      HabitanRepository,
      HabitanEvent,
      HabitanEventRepository,
    ]),
  ],
  providers: [
    HabitanService,
    HabitanResolver,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EvnetHandlers,
  ],
  controllers: [HabitansController],
  exports: [HabitanService],
})
export class HabitansModule {}
