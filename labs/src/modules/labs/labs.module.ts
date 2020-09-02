import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  ActRepository,
  LabRepository,
  EventRepository,
} from './lab.repository';
import { LabResolver } from './lab.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { Lab } from './models/lab.model';
import { LabEvent } from './models/lab-event.model';
import { LabsController } from './labs.controller';
import { CommandHandlers } from './commands/handlers';
import { EvnetHandlers } from './events/handlers';
import { LabsService } from './labs.service';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Act,
      Lab,
      LabEvent,
      ActRepository,
      LabRepository,
      EventRepository,
    ]),
  ],
  providers: [
    LabResolver,
    ...CommandHandlers,
    ...EvnetHandlers,
    ...QueryHandlers,
    LabsService,
  ],
  controllers: [LabsController],
})
export class LabsModule {}
