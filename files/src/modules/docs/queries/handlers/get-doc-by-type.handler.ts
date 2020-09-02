import { QueryHandler, IQueryHandler, CommandBus } from '@nestjs/cqrs';
import { GetDocByTypeQuery } from '../impl/get-doc-by-type.query';
import { Logger } from '@nestjs/common';
import { DocsService } from '../../docs.service';
import { Doc } from '../../models/doc.model';

@QueryHandler(GetDocByTypeQuery)
export class GetDocByTypeHandler implements IQueryHandler<GetDocByTypeQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly ds: DocsService) {}

  async execute(query: GetDocByTypeQuery): Promise<Doc> {
    this.logger.verbose('get-doc.handler');

    const { id } = query;

    try {
      return await this.ds.getDoc(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
