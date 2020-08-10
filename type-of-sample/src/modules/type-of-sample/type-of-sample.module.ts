import { Module } from '@nestjs/common';
import { TypeOfSampleResolver } from './resolvers/type-of-sample.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfSample } from './models/type-of-sample.model';
import { Habitan } from './models/habitan.model';
import { HabitansType } from './models/habitans-type.model';
import { TypeOfSampleRepository } from './repositories/type-of-sample.repository';
import { HabitanRepository } from './repositories/habitan.repository';
import { HabitansTypeRepository } from './repositories/habitans-type.repository';
import { HabitanResolver } from './resolvers/habitan.resolver';
import { CommandHandlers } from 'src/commands/handlers';
import { QueryHandlers } from 'src/queries/handlers';
import { Act } from './models/act.model';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      TypeOfSample,
      Act,
      Habitan,
      HabitansType,
      TypeOfSampleRepository,
      HabitanRepository,
      HabitansTypeRepository,
    ]),
  ],
  providers: [
    TypeOfSampleResolver,
    HabitanResolver,
    TypeOfSampleResolver,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class TypeOfSampleModule {}
