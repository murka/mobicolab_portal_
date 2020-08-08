import { EntityRepository, Repository } from 'typeorm';
import { Docs, DocEvent } from './models/doc.model';
import { Logger } from '@nestjs/common';
// import { Act } from "./models/act.model";

@EntityRepository(Docs)
export class DocRepository extends Repository<Docs> {
  logger = new Logger(this.constructor.name);
}

// @EntityRepository(Act)
// export class ActRepository extends Repository<Act> {
//     logger = new Logger(this.constructor.name)
// }

@EntityRepository(DocEvent)
export class DocEventRepository extends Repository<DocEvent> {}
