import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { InjectWebDAV, WebDAV } from 'nestjs-webdav';

import { Doc } from './models/doc.model';
import { PrismaService } from 'src/services/prisma.service';
import { ReadStream } from 'fs';
import { ActForFilesDto } from './models/dto/act-for-files.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';

const logger = new Logger('docService');

interface ActDocGrpcClient {
  findLabels(data: { id: string }): Promise<ActForFilesDto>;
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
    private prisma: PrismaService,
    @Inject('ACT_PACKAGE') private readonly actClient: ClientGrpc,
    @Inject('SUBSCRIPTIONS_PACKAGE')
    private readonly subscriptionClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.actDocGrpcClient = this.actClient.getService<ActDocGrpcClient>(
      'ActDocService',
    );
    this.subscriptionsGrpcClient = this.subscriptionClient.getService<
      SubscriptionsGrpcClient
    >('SubscriptionsService');
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

  async createFilePath(actId: string): Promise<Doc['ydUrl']> {
    logger.verbose('create-path inside `docService`');

    const doc = await this.actDocGrpcClient.findLabels({ id: actId });

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

    return path;
  }

  async uploadFileToYd(docId: string, file: ReadStream): Promise<void> {
    logger.verbose('upload-doc.evetn inside `docService`');

    try {
      const doc = await this.prisma.doc.findOne({ where: { id: docId } });

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
