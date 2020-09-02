// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { Observable } from "rxjs";
// import { ChangeGCustomerIdDto } from "../../models/dto/change-gneral-customer-id.dto";
// import { ChangeGCustomerIdCommand } from "../impl/change-gcustomer-id.command";
// import { Inject, Logger, OnModuleInit } from "@nestjs/common";
// import { ClientGrpc } from "@nestjs/microservices";

// interface GCustomerGrpcService {
//     migrationGeneralCustomer(data: ChangeGCustomerIdDto): Observable<any>
// }

// @CommandHandler(ChangeGCustomerIdCommand)
// export class ChangeGCustomerIdHandler implements ICommandHandler<ChangeGCustomerIdCommand>, OnModuleInit {
//     logger = new Logger(this.constructor.name)

//     private gcustomerGrpcService: GCustomerGrpcService

//     constructor(@Inject('ACTS_PACKAGE') private readonly client: ClientGrpc) {}

//     onModuleInit() {
//         this.gcustomerGrpcService = this.client.getService<GCustomerGrpcService>('MigrationService')
//     }

//     async execute(command: ChangeGCustomerIdCommand) {
//         this.logger.verbose('change-gcustomer-id.command inside `client`')

//         const { newId, oldId } = command

//         try {
//             this.gcustomerGrpcService.migrationGeneralCustomer({ newId, oldId }).subscribe(r => this.logger.log(r))
//         } catch(e) {
//             this.logger.error(e)
//         }
//     }
// }
