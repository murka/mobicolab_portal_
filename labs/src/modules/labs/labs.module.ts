import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../../grpc-client.options';
import { ActRepository, LabRepository } from './lab.repository';
import { ActResolver } from './act.resolver';
import { LabResolver } from './lab.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LAB_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [ActRepository, LabRepository, ActResolver, LabResolver],
})
export class LabsModule {}
