import { EntityRepository, Repository } from 'typeorm';
import { GeneralCustomer } from './models/general-customer.model';
import { Logger } from '@nestjs/common';

@EntityRepository(GeneralCustomer)
export class GCustomerRepository extends Repository<GeneralCustomer> {
  logger = new Logger(this.constructor.name);

  async changeId(newId: string, oldId: string): Promise<void> {
    this.logger.verbose('changer id inside repository');

    const gcustomer = await this.findOne(oldId);

    if (gcustomer) {
      await this.update(gcustomer, { id: newId });
    }
  }
}
