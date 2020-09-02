import { GetAllDocsOfActQuery } from '../impl/get-all-docs-of-act.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Doc } from '../../models/doc.model';
import { ActRepository } from '../../repositories/act.repository';

@QueryHandler(GetAllDocsOfActQuery)
export class GetAllDocsOfActHandler
  implements IQueryHandler<GetAllDocsOfActQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actRepository: ActRepository) {}

  async execute(query: GetAllDocsOfActQuery): Promise<Doc[]> {
    this.logger.verbose('get-all-docs-of-acts.query');

    const { actId } = query;

    try {
      return (await this.actRepository.findOne(actId, { relations: ['docs'] }))
        .docs;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
