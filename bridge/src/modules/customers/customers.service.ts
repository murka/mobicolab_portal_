import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
    logger = new Logger(this.constructor.name)

    constructor(@InjectModel('customer') private readonly customerModel: Model<any>) {}

    async findAllCustomers(): Promise<any[]> {
        this.logger.verbose('findAllCustomers method inside `bridge-api`')
        return await this.customerModel.find()
    }
}
