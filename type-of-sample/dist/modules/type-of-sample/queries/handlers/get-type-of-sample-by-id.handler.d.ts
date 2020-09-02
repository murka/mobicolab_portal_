import { IQueryHandler } from '@nestjs/cqrs';
import { GetTypeOfSampleByIdQuery } from '../impl/get-type-of-sample-by-id.query';
import { Logger } from '@nestjs/common';
import { TypeOfSample } from '../../models/type-of-sample.model';
import { TypeOfSampleRepository } from '../../repositories/type-of-sample.repository';
export declare class GetTypeOfSampleByIdHandler implements IQueryHandler<GetTypeOfSampleByIdQuery> {
    private readonly tosRepository;
    logger: Logger;
    constructor(tosRepository: TypeOfSampleRepository);
    execute(query: GetTypeOfSampleByIdQuery): Promise<TypeOfSample>;
}
