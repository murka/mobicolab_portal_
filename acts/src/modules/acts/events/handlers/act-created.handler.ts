import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ActCreatedEvent } from "../impl/act-created.event";
import { Logger } from "@nestjs/common";
import { ActRepository } from '../../act.repository'
import { EventRepository } from "../../references.repository";

@EventsHandler(ActCreatedEvent)
export class ActCreatedHandler implements IEventHandler<ActCreatedEvent> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly actEventRepository: EventRepository, private readonly actRepository: ActRepository) {}

    async handle(event: ActCreatedEvent) {
        this.logger.verbose('act-created.event')

        const { actId } = event;

        const act = await this.actRepository.findOne(actId)

        const newEvent = this.actEventRepository.create({ event: 'CREATED', act: act })

        await this.actEventRepository.save(newEvent)
    }
}