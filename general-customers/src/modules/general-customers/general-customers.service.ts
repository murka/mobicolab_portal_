import { Injectable, Logger } from '@nestjs/common';
import { GeneralCustomerRepository } from './general-customer.repository';

@Injectable()
export class GeneralCustomersService {
    logger = new Logger(this.constructor.name)

    constructor(private readonly gcustomerRepositroy: GeneralCustomerRepository) {}

    async getGCustomersLabel(id: string): Promise<{ label: string }> {
        this.logger.verbose('get-gcustomer`s-label.method')

        try {
            const gcustomer = await this.gcustomerRepositroy.findOne(id)

            return { label: gcustomer.label }
        } catch(e) {
            this.logger.error(e)
        }
    }
}
