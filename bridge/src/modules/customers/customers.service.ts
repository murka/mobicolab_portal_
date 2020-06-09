import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
    constructor(@InjectModel('customer') private readonly customerModel: Model<any>) {}

    async findAllCustomers(): Promise<any[]> {
        return await this.customerModel.find()
    }
}
