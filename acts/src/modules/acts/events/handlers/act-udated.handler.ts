import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ActUpdatedEvent } from "../impl/act-updated.event";
import { Logger } from "@nestjs/common";
import { ActRepository } from "../../act.repository";
import { EventRepository } from "../../references.repository";

@EventsHandler(ActUpdatedEvent)
export class ActUpdatedHandler implements IEventHandler<ActUpdatedEvent> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly actRepository: ActRepository, private readonly eventRepositroy: EventRepository) {}

    async handle(event: ActUpdatedEvent): Promise<void> {
        this.logger.verbose('act-updeted.event')

        const { actId } = event

        try{
            const act = await this.actRepository.findOne(actId)

            const event = this.eventRepositroy.create({ event: 'UPDATED', act: act })

            await this.eventRepositroy.save(event)
        } catch(e) {
            this.logger.error(e)
        }
    }
}