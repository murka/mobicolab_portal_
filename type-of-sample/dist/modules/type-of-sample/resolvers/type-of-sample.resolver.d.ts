import { TypeOfSample } from '../models/type-of-sample.model';
import { Logger } from '@nestjs/common';
import { TypeOfSampleRepository } from '../repositories/type-of-sample.repository';
import { QueryBus } from '@nestjs/cqrs';
export declare class TypeOfSampleResolver {
    private readonly tosRepository;
    private readonly queryBus;
    logger: Logger;
    constructor(tosRepository: TypeOfSampleRepository, queryBus: QueryBus);
    getTypeOfSample(id: string): Promise<TypeOfSample>;
    resolveReference(reference: {
        __typename: string;
        id: string;
    }): Promise<TypeOfSample>;
}
