import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TitlingDocCommand } from '../impl/titling-doc.command';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Doc } from '../../models/doc.model';

@CommandHandler(TitlingDocCommand)
export class TitlingDocHandler implements ICommandHandler<TitlingDocCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private prisma: PrismaService) {}

  async execute(command: TitlingDocCommand): Promise<any> {
    this.logger.verbose('titling-doc.command')
    
    const { docId, title } = command;

    const doc = await this.prisma.doc.update({
      where: { id: docId },
      data: { title: title, doc_event: { create: [{ event: 'TITLED' }] } },
    });

    return doc
  }
}
