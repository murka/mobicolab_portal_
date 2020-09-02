import { EntityRepository, Repository } from 'typeorm';
import { ActEvent } from '../models/act-event.model';

@EntityRepository(ActEvent)
export class EventRepository extends Repository<ActEvent> {}
