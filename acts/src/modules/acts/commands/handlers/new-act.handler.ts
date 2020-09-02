import {
  CommandHandler,
  ICommandHandler,
  EventPublisher,
  EventBus,
} from '@nestjs/cqrs';
import { NewActCommand } from '../impl/new-act.command';
import { Act } from '../../models/act.model';
import { Logger } from '@nestjs/common';
import { ActRepository } from '../../repositories/act.repository';
import { ActsService } from '../../acts.service';
import { ApplicationRepository } from '../../repositories/application.repository';
import { Application } from '../../models/application.model';
import { ActCreatedEvent } from '../../events/impl/act-created.event';

@CommandHandler(NewActCommand)
export class NewActHandler implements ICommandHandler<NewActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly appRepository: ApplicationRepository,
    private readonly as: ActsService,
    private eventBus: EventBus,
  ) {}

  async execute(command: NewActCommand): Promise<Act> {
    this.logger.verbose(`new-act.command`);

    const { newActData } = command;

    try {
      const customer = await this.as.getCusomer(newActData.customer);

      const generalCustomer = await this.as.getGeneralCustomer(
        newActData.generalCustomer,
      );

      const lab = await this.as.getLab(newActData.lab);

      const { tos, habitan, htype } = await this.as.getTOSByReletaions(
        newActData.typeOfSample.habitan,
        newActData.typeOfSample.htype,
      );

      let applications: Application[] = [];

      if (newActData.applications) {
        this.logger.log(newActData.applications);
        for await (let application of newActData.applications) {
          const app = await this.appRepository.findOne(application.id);

          await this.appRepository.update(app.id, {
            ...application,
          });

          applications.push(app);
        }
      }

      const newAct = await this.actRepository.save({
        ...newActData,
        customer: customer,
        generalCustomer: generalCustomer,
        lab: lab,
        typeOfSample: tos,
        applications: applications,
      });

      this.eventBus.publish(
        new ActCreatedEvent(newAct, 'Customer', customer.id),
      );
      this.eventBus.publish(
        new ActCreatedEvent(newAct, 'GeneralCustomer', generalCustomer.id),
      );
      this.eventBus.publish(new ActCreatedEvent(newAct, 'Lab', lab.id));

      this.eventBus.publish(new ActCreatedEvent(newAct, 'TOS', htype.id));

      this.eventBus.publish(new ActCreatedEvent(newAct, 'ACT', newAct.id));

      return newAct;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
