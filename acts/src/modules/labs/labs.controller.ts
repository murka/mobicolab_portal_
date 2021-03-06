import { Controller, Logger } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  KafkaContext,
  Ctx,
} from '@nestjs/microservices';
import { LabsService } from './labs.service';

@Controller('labs')
export class LabsController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly labService: LabsService) {}

  @EventPattern('outbox.event.Lab.CREATED')
  async handleNewLab(@Payload() message: any): Promise<any> {
    this.logger.log(JSON.stringify(message, null, 2));

    const { value } = message;

    try {
      this.labService.labCreated(value.payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @EventPattern('outbox.event.Lab.UPDATED')
  async handleUpdatedLab(@Payload() message: any): Promise<any> {
    this.logger.verbose('handle-updated-lab');

    const {
      value: { payload: id },
    } = message;

    try {
      this.labService.labUpdated(id);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
