import { Controller, Logger } from '@nestjs/common';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';
import { AddActDto } from './models/dto/add-act.dto';
import { AddActCommand } from './commands/impl/add-act.command';

@Controller('customers')
export class CustomersController {
    logger = new Logger(this.constructor.name)

    constructor(private readonly commandBus: CommandBus) {}

    @GrpcStreamMethod('MigrationService')
    async addActsCusromerReference(data$: Observable<AddActDto>): Promise<void> {
        this.logger.verbose(`add-new-act-to-customer.controller with addActDto: ${data$}`)

        data$.subscribe(data => {
            this.commandBus.execute(new AddActCommand(data))
        })
    }

}
