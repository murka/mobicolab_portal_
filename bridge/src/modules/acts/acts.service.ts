import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ActsService {
    logger = new Logger(this.constructor.name)

    constructor(@InjectModel('act') private readonly actModel: Model<any>,
    @InjectModel('customer') private readonly customerModel: Model<any>) {}

    async findAllActs(): Promise<any[]> {
        this.logger.verbose('inside findAllActs method')
        const acts = await this.actModel.find()
        return acts
    }
}
