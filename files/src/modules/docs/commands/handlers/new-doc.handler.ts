import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewDocCommand } from '../impl/new-doc.commadn';
import { Logger, Inject } from '@nestjs/common';
import { Docs } from '../../models/doc.model';

@CommandHandler(NewDocCommand)
export class NewDocHandler implements ICommandHandler<NewDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor() // @Inject('PUB_SUB') private readonly pubsub: PubSub,
  {}

  async execute(command: NewDocCommand): Promise<void> {
    // this.logger.verbose('new-doc.command');
    // const { docId } = command;
    // const doc = await this.prisma.doc.findOne({ where: { id: docId } });
    // this.pubsub.publish(`DOC_${docId}`, doc);
  }
}
