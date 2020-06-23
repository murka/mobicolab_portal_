import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcStreamMethod, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AddActDto } from './models/dto/add-act.dto';
import { AddActCommand } from './commands/impl/add-act.command';
import { LabsService } from './labs.service';

@Controller('labs')
export class LabsController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly commandBus: CommandBus, private readonly ls: LabsService) {}

  @GrpcStreamMethod('MigrationService')
  async addActsLabReference(data$: Observable<AddActDto>): Promise<void> {
    this.logger.verbose(
      `add-new-act-to-lab.controller with addActDto: ${data$}`,
    );

    data$.subscribe(data => {
      this.commandBus.execute(new AddActCommand(data));
    });
  }

  @GrpcMethod('MigrationService')
  async GetLabsLabes(data: { id: string }): Promise<{ label: string }> {
    return await this.ls.getLabsLabel(data.id)
  }
}
