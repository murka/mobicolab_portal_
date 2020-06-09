import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { DownloadingDocCommand } from "../impl/downloading-doc.command";
import { Logger } from "@nestjs/common";
import { DocsService } from "../../docs.service";
import { PrismaService } from "src/services/prisma.service";
import { DownloadedDocEvent } from "../../events/impl/downloaded-doc.event";
import { ReadStream } from "fs";

@CommandHandler(DownloadingDocCommand)
export class DownloadingDocHandler implements ICommandHandler<DownloadingDocCommand> {
    logger = new Logger(this.constructor.name)

    constructor(private eventBus: EventBus, private ds: DocsService, private prisma: PrismaService) {}

    async execute(command: DownloadingDocCommand): Promise<ReadStream> {
        this.logger.verbose(`downloading-doc.command`)

        const { docId } = command

        this.eventBus.publish(new DownloadedDocEvent(docId))

        const doc = await this.prisma.doc.findOne({ where: { id: docId } })

        const filepaht = doc.ydUrl
        const name = doc.name

        return await this.ds.downloadFileFromYd(filepaht, name)
    }
}