import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LabsService {
    constructor(@InjectModel('lab') private readonly labModel: Model<any>) {}

    async findAllLabs(): Promise<any[]> {
        return await this.labModel.find();
    }
}
