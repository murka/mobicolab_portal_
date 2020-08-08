import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { grpcClientOptions } from '../../gRPC/grpc-bridge-client.options';
import {
  ActRepository,
  LabRepository,
  EventRepository,
} from './lab.repository';
import { LabResolver } from './lab.resolver';
import { grpcActsClientOptions } from 'src/gRPC/grpc-acts-client.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { Lab } from './models/lab.model';
import { LabEvent } from './models/lab-event.model';
import { LabsController } from './labs.controller';
import { CommandHandlers } from './commands/handlers';
import { EvnetHandlers } from './events/handlers';
import { LabsService } from './labs.service';

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
    ClientsModule.register([
      {
        name: 'BRIDGE_PACKAGE',
        ...grpcClientOptions,
      },
      {
        name: 'ACTS_PACKAGE',
        ...grpcActsClientOptions,
      },
    ]),
  ],
  providers: [LabResolver, ...CommandHandlers, ...EvnetHandlers, LabsService],
  controllers: [LabsController],
})
export class LabsModule {}
