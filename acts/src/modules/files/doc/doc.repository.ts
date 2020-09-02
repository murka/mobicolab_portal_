import { Repository, EntityRepository } from 'typeorm';
import { Doc } from '../models/doc.model';
import { Logger } from '@nestjs/common';

@EntityRepository(Doc)
export class DocRepository extends Repository<Doc> {
  logger = new Logger(this.constructor.name);

  async createDoc(docId: string): Promise<Doc> {
    this.logger.verbose('create-doc');

    try {
      const doc = this.create({ id: docId });

      return await this.save(doc);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
