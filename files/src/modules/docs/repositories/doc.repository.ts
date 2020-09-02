import { EntityRepository, Repository } from 'typeorm';
import { Doc } from '../models/doc.model';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { DocEvent } from '../models/doc-event.model';

@EntityRepository(Doc)
export class DocRepository extends Repository<Doc> {
  logger = new Logger(this.constructor.name);

  async findDoc(id: string): Promise<Doc> {
    this.logger.verbose('find-doc');

    try {
      const doc = await this.findOne(id);

      if (!doc)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Doc didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      return doc;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findDocByType(actId: string, type: string): Promise<Doc> {
    this.logger.verbose('find-doc-by-type');

    try {
      const docs = await this.find({
        where: { title: type, act: { id: actId } },
        order: { createdAt: 'ASC' },
      });

      const doc = docs[docs.length - 1];

      return doc;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteDoc(id: string): Promise<void> {
    this.logger.verbose('delete-doc');

    try {
      await this.delete({ id });
    } catch (error) {
      this.logger.error(error);
    }
  }
}

// @EntityRepository(Act)
// export class ActRepository extends Repository<Act> {
//     logger = new Logger(this.constructor.name)
// }

@EntityRepository(DocEvent)
export class DocEventRepository extends Repository<DocEvent> {}
