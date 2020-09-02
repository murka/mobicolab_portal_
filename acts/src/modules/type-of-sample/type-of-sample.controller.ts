import { Controller, Logger } from '@nestjs/common';
import { Payload, EventPattern } from '@nestjs/microservices';
import { TypeOfSampleService } from './type-of-sample.service';

@Controller('type-of-sample')
export class TypeOfSampleController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly tosService: TypeOfSampleService) {}

  @EventPattern('outbox.event.Habitan.CREATED')
  async handleNewHabitan(@Payload() message: any): Promise<void> {
    this.logger.verbose(
      `handle-new-habitan ${JSON.stringify(message, null, 2)}`,
    );

    const { value } = message;

    try {
      this.tosService.habitanCreated(value.payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @EventPattern('outbox.event.HType.CREATED')
  async handleNewHType(@Payload() message: any): Promise<void> {
    this.logger.verbose(`handle-new-htype ${JSON.stringify(message, null, 2)}`);

    const { value } = message;

    try {
      this.tosService.htypeCreated(value.payload);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
