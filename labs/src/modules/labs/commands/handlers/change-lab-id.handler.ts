import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Observable } from "rxjs";
import { Inject, Logger, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { ChangeLabIdDto } from '../../models/dto/change-lab-id.dto';
import { ChangeLabIdCommand } from '../impl/change-lab-id.command';

interface LabGrpcService {
    migrationLab(data: ChangeLabIdDto): Observable<any>
}

@CommandHandler(ChangeLabIdCommand)
export class ChangeLabIdHandler implements ICommandHandler<ChangeLabIdCommand>, OnModuleInit {
    logger = new Logger(this.constructor.name)

    private labGrpcSevice: LabGrpcService

    constructor(@Inject('ACTS_PACKAGE') private readonly client: ClientGrpc) {}

    onModuleInit() {
        this.labGrpcSevice = this.client.getService<LabGrpcService>('MigrationService')
    }

    async execute(command: ChangeLabIdCommand) {
        this.logger.verbose('change-lab-id.command inside `client`')

        const { newId, oldId } = command

        try{ 
            this.labGrpcSevice.migrationLab({ newId, oldId }).subscribe(r => this.logger.log(r))
        } catch(e) {
            this.logger.error(e)
        }
    }
}