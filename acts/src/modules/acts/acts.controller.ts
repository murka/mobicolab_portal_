import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { ChangeCustomerIdCommand, ChangeGeneralCustomerIdCommand, ChangeLabIdCommand } from './commands/impl/migrations.commands';
import { GetActForFilesCommand } from './commands/impl/get-act-for-files.command';
import { ActForFilesDto } from './models/dto/act-for-files.dto';

export interface ChangeIdDto {
  newId: string;
  oldId: string;
}

@Controller('acts')
export class ActsController {
  logger = new Logger(this.constructor.name);

  constructor(private commandBus: CommandBus,) {}

  @GrpcMethod('MigrationService', 'MigrationCustomer')
  async migrationCustomer(data: ChangeIdDto): Promise<any> {
    this.logger.verbose('migration-customer inside `grpcMethod`');
    await this.commandBus.execute(
      new ChangeCustomerIdCommand(data),
    );
    return { respon: 'success' };
  }

  @GrpcMethod('MigrationService')
  async migrationGeneralCustomer(data: ChangeIdDto): Promise<any> {
    this.logger.verbose('migration-gcustomer inside `grpcMethod`')
    await this.commandBus.execute(
      new ChangeGeneralCustomerIdCommand(data),
    )
    return { respon: 'success' }
  }

  @GrpcMethod('MigrationService')
  async migrationLab(data: ChangeIdDto): Promise<any> {
    this.logger.verbose('migration-lab indsede `grpcMethod`')
    await this.commandBus.execute(
      new ChangeLabIdCommand(data),
    )
    return { respon: 'success' }
  }

  @GrpcMethod('ActDocService')
  async findLabels(data: { id: string }): Promise<ActForFilesDto> {
    this.logger.verbose('find-act-by-id.grpc-method')
    return await this.commandBus.execute(new GetActForFilesCommand(data.id))
  }
}
