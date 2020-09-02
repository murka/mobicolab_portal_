import {
  CommandHandler,
  ICommandHandler,
  EventPublisher,
  EventBus,
} from '@nestjs/cqrs';
import { UpdateActCommand } from '../impl/update-act.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ActRepository } from '../../repositories/act.repository';
import { Act } from '../../models/act.model';
import { ActsService } from '../../acts.service';
import { ActUpdatedEvent } from '../../events/impl/act-updated.event';
import { Application } from '../../models/application.model';
import { ApplicationRepository } from '../../repositories/application.repository';

@CommandHandler(UpdateActCommand)
export class UpdateActHandler implements ICommandHandler<UpdateActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly appRepository: ApplicationRepository,
    private readonly as: ActsService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateActCommand): Promise<Act> {
    this.logger.verbose('update-act.handler');

    const { data } = command;

    try {
      let act = await this.actRepository.findOne(data.id);

      this.logger.log(act);

      if (!act)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Act doesn`t find',
          },
          HttpStatus.NOT_FOUND,
        );

      let newCustomer = act.customer;

      if (data.customer && data.customer !== newCustomer.id) {
        newCustomer = await this.as.getCusomer(data.customer);
        this.eventBus.publish(
          new ActUpdatedEvent(act, 'Customer', data.customer),
        );
      }

      this.logger.log(newCustomer);

      let newGCustomer = act.generalCustomer;

      if (data.generalCustomer && data.generalCustomer !== newGCustomer.id) {
        newGCustomer = await this.as.getGeneralCustomer(data.generalCustomer);
        this.eventBus.publish(
          new ActUpdatedEvent(act, 'GeneralCusomer', data.generalCustomer),
        );
      }

      this.logger.log(newGCustomer);

      let newLab = act.lab;

      if (data.lab && data.lab !== newLab.id) {
        newLab = await this.as.getLab(data.lab);
        this.eventBus.publish(new ActUpdatedEvent(act, 'Lab', data.lab));
      }

      this.logger.log(newLab);

      let newTos = await this.as.getTOS(act.typeOfSample.id);
      let newHabitan = newTos.habitan;
      let newHType = newTos.htype;

      if (
        (data.typeOfSample.habitan &&
          data.typeOfSample.habitan !== newHabitan.id) ||
        (data.typeOfSample.htype && data.typeOfSample.htype !== newHType.id)
      ) {
        const { tos, habitan, htype } = await this.as.getTOSByReletaions(
          data.typeOfSample.habitan,
          data.typeOfSample.htype,
        );

        newTos = tos;

        if (
          data.typeOfSample.habitan &&
          data.typeOfSample.habitan !== newHabitan.id
        ) {
          this.eventBus.publish(
            new ActUpdatedEvent(act, 'Habitan', habitan.id),
          );
        }
        if (
          data.typeOfSample.htype &&
          data.typeOfSample.htype !== newHType.id
        ) {
          this.eventBus.publish(new ActUpdatedEvent(act, 'HType', htype.id));
        }

        this.logger.log(
          `actId: ${act.id}, oldId: ${data.typeOfSample.habitan}, newID: ${newHType}`,
        );
      }

      this.logger.verbose('befor update applications');
      let applications: Application[] = [];

      if (data.applications) {
        for await (let application of data.applications) {
          await this.appRepository.update(application.id, {
            ...application,
          });
          const app = await this.appRepository.findOne(application.id);
          this.logger.log(app);

          applications.push(app);
        }
      }

      this.logger.verbose('after update applications');

      this.logger.log(applications);

      act = {
        ...data,
        customer: newCustomer,
        generalCustomer: newGCustomer,
        lab: newLab,
        typeOfSample: newTos,
        applications: applications,
      } as Act;

      return await this.actRepository.save(act);
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
