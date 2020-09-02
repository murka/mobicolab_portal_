// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { ChangeCustomerIdCommand } from '../impl/change-customer-id.command';
// import { Logger, OnModuleInit, Inject } from '@nestjs/common';
// import { ChangeCustomerIdDto } from '../../models/dto/change-customer-id.dto';
// import { Observable } from 'rxjs';
// import { ClientGrpc } from '@nestjs/microservices';

// interface CustomerGrpcService {
//   migrationCustomer(data: ChangeCustomerIdDto): Observable<any>;
// }

// @CommandHandler(ChangeCustomerIdCommand)
// export class ChangeCustomerIdHandler
//   implements ICommandHandler<ChangeCustomerIdCommand>, OnModuleInit {
//   logger = new Logger(this.constructor.name);

//   private customerGrpcService: CustomerGrpcService;

//   constructor(@Inject('ACTS_PACKAGE') private readonly client: ClientGrpc) {}

//   onModuleInit() {
//     this.customerGrpcService = this.client.getService<CustomerGrpcService>(
//       'MigrationService',
//     );
//   }

//   async execute(command: ChangeCustomerIdCommand) {
//     this.logger.verbose('change-customer-id.command inside `client`');

//     const { newId, oldId } = command;

//     try {
//       this.customerGrpcService
//         .migrationCustomer({ newId, oldId })
//         .subscribe((r) => this.logger.log(r));
//     } catch (e) {
//       this.logger.error(e);
//     }
//   }
// }
