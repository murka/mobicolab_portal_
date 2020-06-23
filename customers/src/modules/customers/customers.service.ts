import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomersService {
    logger = new Logger(this.constructor.name)

    constructor(private readonly customerRepository: CustomerRepository) {}

    async getCustomersLabel(id: string): Promise<{ label: string }> {
        this.logger.verbose('get-customer`s-label.method')

        try{
            const customer = await this.customerRepository.findOne(id)

            return { label: customer.label }
        } catch(e) {
            this.logger.error(e)
        }
    }
}
