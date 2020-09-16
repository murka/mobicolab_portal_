import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DocsService } from './docs.service';

@Controller('docs')
export class DocsController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly ds: DocsService) {}

  @EventPattern('outbox.event.DOC.ACT')
  @EventPattern('outboc.event.DOC.PROTOCOL')
  @EventPattern('outboc.event.DOC.FINAL_PROTOCOL')
  async handlerNewDoc(@Payload() message: any): Promise<void> {
    this.logger.verbose('handle-new-doc');

    this.logger.log(message);

    const {
      value: { payload: docId },
      key: { payload: actId },
    } = message;

    let mutation = 'SAVED';

    try {
      this.ds.publishDoc(docId, actId, mutation);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
