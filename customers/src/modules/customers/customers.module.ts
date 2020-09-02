import { Module } from '@nestjs/common';
import { CustomerResolver } from './customer.resolver';
import {
  ActRepository,
  CustomerRepository,
  EventRepository,
} from './customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './models/customer.model';
import { Act } from './models/act.model';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsHandlers } from './commands/handlers';
import { CustomersController } from './customers.controller';
import { EvnetHandlers } from './events/handlers';
import { CustomerEvent } from './models/customer-event.model';
import { CustomersService } from './customers.service';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Customer,
      Act,
      CustomerEvent,
      CustomerRepository,
      ActRepository,
      EventRepository,
    ]),
  ],
  providers: [
    CustomerResolver,
    ...CommandsHandlers,
    ...EvnetHandlers,
    ...QueryHandlers,
    CustomersService,
  ],
  controllers: [CustomersController],
})
export class CustomersModule {}
