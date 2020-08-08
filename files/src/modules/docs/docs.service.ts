import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';

import { InjectWebDAV, WebDAV } from 'nestjs-webdav';

import { Docs } from './models/doc.model';
import { ReadStream } from 'fs';
import { ActForFilesDto } from './models/dto/act-for-files.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { DocRepository } from './doc.repository';

const logger = new Logger('docService');

interface ActDocGrpcClient {
  findLabels(data: { id: string }): Promise<ActForFilesDto>;
  addReferenceToAct(data: { actId: string; docId: string }): Promise<void>;
}

interface SubscriptionsGrpcClient {
  pushDoc(data: {
    docId: string;
    actId: string;
    mutation: string;
  }): Promise<void>;
  pushDocs(
    data$: Observable<{ docId: string; actId: string; mutation: string }>,
  ): Promise<void>;
}

@Injectable()
export class DocsService implements OnModuleInit {
  private actDocGrpcClient: ActDocGrpcClient;
  private subscriptionsGrpcClient: SubscriptionsGrpcClient;

  constructor(
    @InjectWebDAV() private readonly webDav: WebDAV,
    @Inject('ACT_PACKAGE') private readonly actClient: ClientGrpc,
    @Inject('SUBSCRIPTIONS_PACKAGE')
    private readonly subscriptionClient: ClientGrpc,
    private readonly docRepository: DocRepository,
  ) {}

  onModuleInit() {
    this.actDocGrpcClient = this.actClient.getService<ActDocGrpcClient>(
      'ActDocService',
    );
    this.subscriptionsGrpcClient = this.subscriptionClient.getService<
      SubscriptionsGrpcClient
    >('SubscriptionsService');
  }

  async addReferenceToAct(actId: string, docId: string): Promise<void> {
    logger.verbose('add-reference-to-act.method');
    await this.actDocGrpcClient.addReferenceToAct({ actId, docId });
  }

  async publishDoc(
    docId: string,
    actId: string,
    mutation: string,
  ): Promise<void> {
    logger.verbose('publish-doc.method');

    try {
      await this.subscriptionsGrpcClient.pushDoc({ docId, actId, mutation });
    } catch (error) {
      logger.error(error);
    }
  }

  async publishDocs(
    docsId: string[],
    actId: string,
    mutation: string,
  ): Promise<void> {
    logger.verbose('publish-doc.method');

    try {
      let data$ = new ReplaySubject<{
        docId: string;
        actId: string;
        mutation: string;
      }>();

      for await (let docId of docsId) {
        data$.next({ docId, actId, mutation });
      }
      data$.complete();
      await this.subscriptionsGrpcClient.pushDocs(data$);
    } catch (error) {
      logger.error(error);
    }
  }

  async dirControl(path: string): Promise<any> {
    const direx = await this.webDav.exists(path);
    if (!direx) {
      try {
        return await this.webDav.createDirectory(path);
      } catch (err) {
        logger.error(err);
      }
    }
  }

  async mkDir(path: string[]): Promise<string> {
    let filepath = '/Portal/';
    for await (let dir of path) {
      filepath += `${dir}/`;
      try {
        await this.dirControl(filepath);
      } catch (error) {
        logger.error(error);
      }
    }
    return filepath;
  }

  async createFilePath(actId: string): Promise<Docs['ydUrl']> {
    logger.verbose('create-path inside `docService`');

    const doc = await this.actDocGrpcClient.findLabels({ id: actId });

    logger.log(doc);

    const name = doc.name;
    const date = new Date(doc.datetime.date);
    const year = date.getFullYear();
    const customer = doc.customer.label;
    const gcustomer = doc.general_customer.label;
    const lab = doc.lab.label;
    const month = new Intl.DateTimeFormat('ru-Ru', { month: 'long' }).format(
      date,
    );
    const ar = [];
    ar.push(year, customer, gcustomer, lab, month, name);
    const path = await this.mkDir(ar);

    logger.verbose(path);

    return path;
  }

  async uploadFileToYd(docId: string, file: File): Promise<void> {
    logger.verbose('upload-doc.evetn inside `docService`');

    try {
      // const doc = await this.prisma.doc.findOne({ where: { id: docId } });

      const doc = await this.docRepository.findOne(docId);

      const path = doc.ydUrl;
      const name = doc.name;

      await this.webDav.putFileContents(`${path}${name}`, file);
    } catch (error) {
      logger.error(error);
    }
  }

  async downloadFileFromYd(
    filepath: string,
    filename: string,
  ): Promise<ReadStream> {
    logger.verbose('download-doc.event inside `docService`');

    try {
      return await this.webDav.createReadStream(`${filepath}${filename}`);
    } catch (e) {
      logger.error(e);
    }
  }

  async deleteFileFromYd(filepath: string, filename: string) {
    logger.verbose('delete-doc.event inside `docService`');

    try {
      await this.webDav.deleteFile(`${filepath}${filename}`);
    } catch (e) {
      logger.error(e);
    }
  }
}
