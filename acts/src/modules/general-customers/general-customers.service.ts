import { Injectable, Logger } from '@nestjs/common';
import { GCustomerRepository } from './general-customers.repositroy';
import { GeneralCustomer } from './models/general-customer.model';
import { Act } from '../acts/models/act.model';

@Injectable()
export class GeneralCustomersService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly generalCustomerRepositroy: GCustomerRepository,
  ) {}

  async findGeneralCustomerById(id: string): Promise<GeneralCustomer> {
    this.logger.verbose('find-gcustomer.method');

    try {
      const gs = await this.generalCustomerRepositroy.findOne(id);

      if (!gs) {
        const newgs = this.generalCustomerRepositroy.create({ id: id });

        return this.generalCustomerRepositroy.save(newgs);
      }

      return gs;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getActsOfGCustomer(id: string): Promise<Act[]> {
    this.logger.verbose('get-acts-of-general-customer.command');

    try {
      let acts: Act[] = [];

      const gcustomer = await this.generalCustomerRepositroy.findOne(id);

      if (!gcustomer) return acts;

      return acts;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async generalCustomerCreated(id: string): Promise<void> {
    this.logger.verbose('gneral-customer-created');

    try {
      const gc = this.generalCustomerRepositroy.create({ id: id });

      await this.generalCustomerRepositroy.save(gc);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async generalCustomerUpdated(id: string): Promise<void> {
    this.logger.verbose('general-customer-updated');

    try {
      const gc = await this.generalCustomerRepositroy.findOne(id);

      if (gc) {
        return;
      } else {
        const gc = this.generalCustomerRepositroy.create({ id: id });

        await this.generalCustomerRepositroy.save(gc);
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
