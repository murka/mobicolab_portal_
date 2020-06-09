import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DroppingDocCommand } from '../impl/dropping-doc.command';
import { PrismaService } from 'src/services/prisma.service';
import { Logger } from '@nestjs/common';
import { Doc } from '../../models/doc.model';
import { DroppedDocEvent } from '../../events/impl/dropped-doc.event';

@CommandHandler(DroppingDocCommand)
export class DroppingDocHandler implements ICommandHandler<DroppingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private prisma: PrismaService, private eventBus: EventBus) {}

  async execute(command: DroppingDocCommand): Promise<Doc> {
    try {
      this.logger.verbose('dropping-doc.command');

      const { file, actId, name } = command;

      const act = await this.prisma.act.findOne({ where: { id: actId } });

      let doc

      if (!act) {
        doc = await this.prisma.doc.create({
          data: { name: name, act: { create: { id: actId } } },
        });
      } else {
        doc = await this.prisma.doc.create({
          data: { name: name, act: { connect: { id: actId } } },
        });
      }

      this.eventBus.publish(new DroppedDocEvent(doc.id, actId, file));

      return doc

    } catch (error) {
      this.logger.error(error);
    }
  }
}
