import { Controller, Logger } from '@nestjs/common';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AddActDto } from './models/dto/add-act.dto';
import { CommandBus } from '@nestjs/cqrs';
import { AddActCommand } from './commands/impl/add-act.command';

@Controller('general-customers')
export class GeneralCustomersController {
    logger = new Logger(this.constructor.name)

    constructor(private readonly commandBus: CommandBus) {}

    @GrpcStreamMethod('MigrationService')
    async addActsGeneralCusromerReference(data$: Observable<AddActDto>): Promise<void> {
        this.logger.verbose(`add-new-act-to-gcustomer.controller with addActDto: ${data$}`)

        data$.subscribe(data => {
            this.commandBus.execute(new AddActCommand(data))
        })
    }
}
