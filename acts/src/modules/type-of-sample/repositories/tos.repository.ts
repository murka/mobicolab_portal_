import { EntityRepository, Repository } from 'typeorm';
import { TypeOfSample } from '../models/type-of-sample.model';

@EntityRepository(TypeOfSample)
export class TOSRepository extends Repository<TypeOfSample> {}
