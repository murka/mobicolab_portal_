import { EntityRepository, Repository } from 'typeorm';
import { Application } from '../models/application.model';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {}
