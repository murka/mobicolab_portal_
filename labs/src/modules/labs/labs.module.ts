import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { grpcClientOptions } from '../../gRPC/grpc-bridge-client.options';
import { ActRepository, LabRepository } from './lab.repository';
import { ActResolver } from './act.resolver';
import { LabResolver } from './lab.resolver';
import { grpcActsClientOptions } from 'src/gRPC/grpc-acts-client.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { Lab } from './models/lab.model';
import { LabsController } from './labs.controller';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Act,
      Lab,
      ActRepository,
      LabRepository,
    ]),
    ClientsModule.register([
      {
        name: 'BRIDGE_PACKAGE',
        ...grpcClientOptions,
      },
      {
        name: 'ACTS_PACKAGE',
        ...grpcActsClientOptions
      }
    ]),
  ],
  providers: [ActResolver, LabResolver, ...CommandHandlers],
  controllers: [LabsController],
})
export class LabsModule {}
