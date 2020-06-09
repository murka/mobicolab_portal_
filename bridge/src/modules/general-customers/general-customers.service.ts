import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GeneralCustomersService {
    constructor(@InjectModel('gcustomer') private readonly gcustomerModel: Model<any>) {}

    async findAllGCustomers(): Promise<any[]> {
        return await this.gcustomerModel.find()
    }
}
