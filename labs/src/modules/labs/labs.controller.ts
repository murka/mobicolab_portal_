import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AddActDto } from './models/dto/add-act.dto';
import { AddActCommand } from './commands/impl/add-act.command';

@Controller('labs')
export class LabsController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly commandBus: CommandBus) {}

  @GrpcStreamMethod('MigrationService')
  async addActsLabReference(data$: Observable<AddActDto>): Promise<void> {
    this.logger.verbose(
      `add-new-act-to-lab.controller with addActDto: ${data$}`,
    );

    data$.subscribe(data => {
      this.commandBus.execute(new AddActCommand(data));
    });
  }
}
