import { Controller, Logger } from '@nestjs/common';
import { GrpcStreamMethod, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';
import { AddActDto } from './models/dto/add-act.dto';
import { AddActCommand } from './commands/impl/add-act.command';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    logger = new Logger(this.constructor.name)

    constructor(private readonly commandBus: CommandBus, private readonly cs: CustomersService) {}

    @GrpcStreamMethod('MigrationService')
    async addActsCusromerReference(data$: Observable<AddActDto>): Promise<void> {
        this.logger.verbose(`add-new-act-to-customer.controller with addActDto: ${data$}`)

        data$.subscribe(data => {
            this.commandBus.execute(new AddActCommand(data))
        })
    }

    @GrpcMethod('MigrationService')
    async getCustomersLabel(data: { id: string }): Promise<{ label: string }> {
        this.logger.verbose('get-customer`s label.grpc-method')

        try {
            return await this.cs.getCustomersLabel(data.id)
        } catch(e) {
            this.logger.error(e)
        }
    }

}
