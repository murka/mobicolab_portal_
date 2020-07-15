import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DroppingDocCommand } from '../impl/dropping-doc.command';
import { Logger } from '@nestjs/common';
import { Doc } from '../../models/doc.model';
import { DroppedDocEvent } from '../../events/impl/dropped-doc.event';
import { DocRepository } from '../../doc.repository';

@CommandHandler(DroppingDocCommand)
export class DroppingDocHandler implements ICommandHandler<DroppingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private docRepositroy: DocRepository, private eventBus: EventBus) {}

  async execute(command: DroppingDocCommand): Promise<Doc> {
    try {
      this.logger.verbose('dropping-doc.command');

      const { file, actId, name } = command;

      const doc = this.docRepositroy.create({ name: file.name })

      await this.docRepositroy.save(doc)

      this.eventBus.publish(new DroppedDocEvent(doc.id, actId, file));

      return doc;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
