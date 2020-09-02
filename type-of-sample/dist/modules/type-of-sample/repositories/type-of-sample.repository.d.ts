import { Repository } from 'typeorm';
import { TypeOfSample } from '../models/type-of-sample.model';
import { Logger } from '@nestjs/common';
export declare class TypeOfSampleRepository extends Repository<TypeOfSample> {
    logger: Logger;
    getTypeOfSampleById(id: string): Promise<TypeOfSample>;
}
