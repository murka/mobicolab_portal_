import { Module } from '@nestjs/common';
import {
  GeneralCustomerRepository,
  ActRepository,
  EventRepository,
} from './general-customer.repository';
import { GeneralCustomerResolver } from './general-customer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralCustomer } from './models/general-customer.model';
import { Act } from './models/act.model';
import { GeneralCustomersController } from './general-customers.controller';
import { CommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { EvnetHandlers } from './events/handlers';
import { GSEvent } from './models/gc-event.model';
import { GeneralCustomersService } from './general-customers.service';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      GeneralCustomer,
      Act,
      GSEvent,
      GeneralCustomerRepository,
      ActRepository,
      EventRepository,
    ]),
  ],
  providers: [
    GeneralCustomerResolver,
    ...CommandHandlers,
    ...EvnetHandlers,
    ...QueryHandlers,
    GeneralCustomersService,
  ],
  controllers: [GeneralCustomersController],
})
export class GenralCustomersModule {}
