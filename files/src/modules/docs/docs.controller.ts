import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  FilesServiceControllerMethods,
  data,
  FilesServiceController,
  SavingData,
  Doc,
  docId,
  DocList,
  File,
} from '../../models/build/files/files';
import { DroppingDocCommand } from './commands/impl/dropping-doc.command';
import { SavingDocCommand } from './commands/impl/saving-doc.command';
import { AddActCommand } from './commands/impl/add-act.command';
import { Observable, ReplaySubject } from 'rxjs';
import { GetDocByTypeQuery } from './queries/impl/get-doc-by-type.query';
import { DocsService } from './docs.service';
import { actId } from 'src/models/build/act/act';

export const docSubject = new ReplaySubject<Doc>();

@Controller('docs')
@FilesServiceControllerMethods()
export class DocsController implements FilesServiceController {
  logger = new Logger(this.constructor.name);

  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly docService: DocsService,
  ) {}

  @EventPattern('outbox.event.ACT.ACT.CREATED')
  async handlerNewAct(@Payload() message: any): Promise<void> {
    this.logger.verbose('handler-new-act');

    const {
      value: { payload: actId },
    } = message;

    try {
      this.commandBus.execute(new AddActCommand(actId));
    } catch (error) {
      this.logger.error(error);
    }
  }

  async downloadDoc(data: docId): Promise<File> {
    this.logger.verbose('download-doc');

    try {
      const doc = await this.docService.getDoc(data.id);

      //   let bufs = [];
      //   let buf: Buffer;

      const file = await this.docService.downloadFileFromYd(
        doc.ydUrl,
        doc.name,
      );

      //   file.on('data', ch => {
      //     bufs.push(ch);
      //   });

      //   file.on('end', () => {
      //     buf = Buffer.concat(bufs);
      //   });

      //   this.logger.log(file);

      return { doc: file, name: doc.name } as File;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getDocByType(data: docId): Promise<Doc> {
    this.logger.verbose('get-doc');

    try {
      return await this.queryBus.execute(new GetDocByTypeQuery(data.id));
    } catch (error) {
      this.logger.error(error);
    }
  }

  async saveDoc(data: SavingData): Promise<Doc> {
    this.logger.verbose('saving-doc.method');

    const file = Buffer.from(data.doc);

    try {
      const doc = await this.commandBus.execute(
        new SavingDocCommand(data.actId, data.docId, file),
      );

      return doc as Doc;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async pushDoc(data: data): Promise<void> {
    this.logger.verbose('push-doc.method');

    const file = Buffer.from(data.doc);

    try {
      await this.commandBus.execute(
        new DroppingDocCommand(
          data.actId,
          data.name,
          file,
          data.mimtype,
          data.title,
        ),
      );
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getDocs(data: actId): Promise<DocList> {
    this.logger.verbose('get-docs');

    try {
      const docs = await this.docService.getDocsByActId(data.id);

      return { item: [...docs] } as DocList;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
