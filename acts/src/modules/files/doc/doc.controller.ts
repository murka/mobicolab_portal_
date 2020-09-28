import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { DocService } from './doc.service';
import { ChangeStatusCommand } from 'src/modules/acts/commands/impl/change-status.command';

@Controller('doc')
export class DocController {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly docService: DocService,
    private readonly commandBus: CommandBus,
  ) {}

  @EventPattern('outbox.event.DOC.ACT')
  async handlerNewDocAct(@Payload() message: any): Promise<void> {
    this.logger.verbose('handle-new-doc-act');

    const {
      value: { payload: docId },
      key: { payload: actId },
    } = message;

    try {
      await this.docService.addDocHandler(docId, actId);
      await this.commandBus.execute(new ChangeStatusCommand(actId, 'ACT'));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @EventPattern('outbox.event.DOC.ACT_PDF')
  async handlerNewDocActPdf(@Payload() message: any): Promise<void> {
    this.logger.verbose('handle-new-doc-act-pdf')

    const {
      value: { payload: docId },
      key: { payload: actId },
    } = message;

    try {
      await this.docService.addDocHandler(docId, actId);
      await this.commandBus.execute(new ChangeStatusCommand(actId, 'ACT_PDF'));
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  @EventPattern('outbox.event.DOC.PROTOCOL')
  async handlerNewDocProto(@Payload() message: any): Promise<void> {
    this.logger.verbose('handle-new-doc-proto');

    const {
      value: { payload: docId },
      key: { payload: actId },
    } = message;

    try {
      await this.docService.addDocHandler(docId, actId);
      await this.commandBus.execute(new ChangeStatusCommand(actId, 'PROTOCOL'));
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @EventPattern('outbox.event.DOC.FINAL_PROTOCOL')
  async handlerNewDocFull(@Payload() message: any): Promise<void> {
    this.logger.verbose('handle-new-doc-full');

    const {
      value: { payload: docId },
      key: { payload: actId },
    } = message;

    try {
      await this.docService.addDocHandler(docId, actId);
      await this.commandBus.execute(
        new ChangeStatusCommand(actId, 'FINAL_PROTOCOL'),
      );
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
