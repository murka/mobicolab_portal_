import { Injectable, Logger } from '@nestjs/common';
import { DocRepository } from './doc.repository';
import { ActsService } from 'src/modules/acts/acts.service';
import { Doc } from '../models/doc.model';

@Injectable()
export class DocService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly docRepository: DocRepository,
    private readonly actService: ActsService,
  ) {}

  async addDocHandler(docId: string, actId: string): Promise<void> {
    this.logger.verbose('add-doc-handler');

    try {
      const act = await this.actService.findAct(actId);

      const doc = await this.docRepository.createDoc(docId);

      doc.act = act;

      await this.docRepository.save(doc);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
