import { EntityRepository, Repository } from 'typeorm';
import { Act } from './models/act.model';

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {}
