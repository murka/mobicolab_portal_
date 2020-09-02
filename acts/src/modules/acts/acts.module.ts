import { Module } from '@nestjs/common';
import { ActResolver } from './resolvers/act.resolver';
import { ActRepository } from './repositories/act.repository';
import { EventRepository } from './repositories/evetns.repository';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../../options/grpc-bridge-client.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { ActsService } from './acts.service';
import { CommandHadlers } from './commands/handlers';
import { EventsHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { ActEvent } from './models/act-event.model';
import { ActsController } from './acts.controller';
import { Doc } from '../files/models/doc.model';
import { QueryHandlers } from './queries/handlers';
import { CustomersModule } from '../customers/customers.module';
import { GeneralCustomersModule } from '../general-customers/general-customers.module';
import { LabsModule } from '../labs/labs.module';
import { TypeOfSampleModule } from '../type-of-sample/type-of-sample.module';
import { ApplicationRepository } from './repositories/application.repository';
import { Application } from './models/application.model';
import { AppResolver } from './resolvers/applications.resolver';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Act,
      ActEvent,
      ActRepository,
      EventRepository,
      Application,
      ApplicationRepository,
    ]),
    ClientsModule.register([
      {
        name: 'ACT_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
    CustomersModule,
    GeneralCustomersModule,
    LabsModule,
    TypeOfSampleModule,
  ],
  providers: [
    ActResolver,
    ActsService,
    AppResolver,
    ...CommandHadlers,
    ...EventsHandlers,
    ...QueryHandlers,
  ],
  controllers: [ActsController],
  exports: [TypeOrmModule, ActsService],
})
export class ActsModule {}
