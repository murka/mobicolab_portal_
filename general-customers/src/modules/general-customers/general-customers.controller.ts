import { Controller, Logger } from '@nestjs/common';
import { GrpcStreamMethod, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AddActDto } from './models/dto/add-act.dto';
import { CommandBus } from '@nestjs/cqrs';
import { AddActCommand } from './commands/impl/add-act.command';
import { GeneralCustomersService } from './general-customers.service';

@Controller('general-customers')
export class GeneralCustomersController {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly gcs: GeneralCustomersService,
  ) {}


  @GrpcStreamMethod('MigrationService')
  async addActsGeneralCusromerReference(
    data$: Observable<AddActDto>,
  ): Promise<void> {
    this.logger.verbose(
      `add-new-act-to-gcustomer.controller with addActDto: ${data$}`,
    );

    data$.subscribe(data => {
      this.commandBus.execute(new AddActCommand(data));
    });
  }

  @GrpcMethod('MigrationService')
  async getGCustomersLabel(data: { id: string }): Promise<{ label: string }> {
    this.logger.verbose('get-general-customer`s-label.grpc-method');

    try {
      return await this.gcs.getGCustomersLabel(data.id);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
