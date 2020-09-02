import { Module, forwardRef } from '@nestjs/common';
import { TypeOfSampleService } from './type-of-sample.service';
import { HabitanResolver } from './resolvers/habitan.resolver';
import { HTypeResolver } from './resolvers/htype.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitan } from './models/habitan.model';
import { HType } from './models/htype.model';
import { HabitanRepository } from './repositories/habitan.repository';
import { HTypeRepository } from './repositories/htype.repository';
import { TypeOfSampleController } from './type-of-sample.controller';
import { TypeOfSample } from './models/type-of-sample.model';
import { ActsModule } from '../acts/acts.module';
import { TOSRepository } from './repositories/tos.repository';
import { TOSResolver } from './resolvers/tos.resolver';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    forwardRef(() => ActsModule),
    TypeOrmModule.forFeature([
      Habitan,
      HType,
      HabitanRepository,
      HTypeRepository,
      TypeOfSample,
      TOSRepository,
    ]),
  ],
  providers: [
    TypeOfSampleService,
    HabitanResolver,
    HTypeResolver,
    TOSResolver,
    ...QueryHandlers,
  ],
  exports: [TypeOfSampleService],
  controllers: [TypeOfSampleController],
})
export class TypeOfSampleModule {}
