import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';

import { InjectWebDAV, WebDAV } from 'nestjs-webdav';

import { Doc } from './models/doc.model';
import fs, { ReadStream, createReadStream } from 'fs';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { DocRepository } from './repositories/doc.repository';
import { grpcCustomerClientOptions } from 'src/options/grpc-customer-client.options';
import { CustomerServiceClient } from 'src/models/build/customer/customer';
import { grpcActClientOptions } from 'src/options/grpc-act-client.options';
import { ActServiceClient } from 'src/models/build/act/act';
import { grpcGeneralCustomerClientOptions } from 'src/options/grpc-general-customer-client.options';
import { GeneralCustomerServiceClient } from 'src/models/build/general-customer/gneral-customer';
import { grpcLabClientOptions } from 'src/options/grpc-lab-client.options';
import { LabServiceClient } from 'src/models/build/lab/lab';
import { ReplaySubject, async } from 'rxjs';
import { Doc as DocSub } from '../../models/build/files/files';
import { ActRepository } from './repositories/act.repository';
import { Act } from './models/act.model';

const logger = new Logger('docService');

@Injectable()
export class DocsService implements OnModuleInit {
  public docSubject = new ReplaySubject<DocSub>();

  @Client(grpcActClientOptions)
  private readonly actClient: ClientGrpc;

  @Client(grpcCustomerClientOptions)
  private readonly customerClient: ClientGrpc;

  @Client(grpcGeneralCustomerClientOptions)
  private readonly generalCustomerClient: ClientGrpc;

  @Client(grpcLabClientOptions)
  private readonly labCustomerClient: ClientGrpc;

  private grpcActService: ActServiceClient;
  private grpcCustomerService: CustomerServiceClient;
  private grpcGeneralCustomerService: GeneralCustomerServiceClient;
  private grpcLabService: LabServiceClient;

  constructor(
    @InjectWebDAV() private readonly webDav: WebDAV,
    private readonly docRepository: DocRepository,
    private readonly actRepository: ActRepository,
  ) {}

  onModuleInit() {
    this.grpcCustomerService = this.customerClient.getService<
      CustomerServiceClient
    >('CustomerService');
    this.grpcActService = this.actClient.getService<ActServiceClient>(
      'ActService',
    );
    this.grpcGeneralCustomerService = this.generalCustomerClient.getService<
      GeneralCustomerServiceClient
    >('GeneralCustomerService');
    this.grpcLabService = this.labCustomerClient.getService<LabServiceClient>(
      'LabService',
    );
  }

  getDoc(id: string): Promise<Doc> {
    logger.verbose('get-doc.method');

    try {
      return this.docRepository.findDoc(id);
    } catch (error) {
      logger.error(error);
    }
  }

  async getDocsByActId(id: string): Promise<Doc[]> {
    logger.verbose('get-docs-by-act');

    try {
      const act = await this.actRepository.findAct(id);

      const docs = act.docs;

      return docs;
    } catch (error) {
      logger.error(error);
    }
  }

  getDocByType(actId: string, type: string): Promise<Doc> {
    logger.verbose('get-doc-gy-type.method');

    try {
      return this.docRepository.findDocByType(actId, type);
    } catch (error) {
      logger.error(error);
    }
  }

  saveDoc(doc: Doc): Promise<Doc> {
    logger.verbose('save-doc');

    try {
      return this.docRepository.save(doc);
    } catch (error) {
      logger.error(error);
    }
  }

  deleteDoc(docId: string): void {
    logger.verbose('delete-doc');

    try {
      this.docRepository.deleteDoc(docId);
    } catch (error) {
      logger.error(error);
    }
  }

  addNewAct(id: string): void {
    logger.verbose('add-new-act');

    try {
      this.actRepository.creteAct(id);
    } catch (error) {
      logger.error(error);
    }
  }

  getAct(id: string): Promise<Act> {
    logger.verbose('get-act');

    try {
      return this.actRepository.findAct(id);
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

    const act = await this.grpcActService
      .getActToFile({ id: actId })
      .toPromise();

    console.log(act);

    const name = act.name;
    const date = new Date(act.datetime.date);
    const year = date.getFullYear();
    const customer = (
      await this.grpcCustomerService
        .getCustomerLabel({ id: act.customer })
        .toPromise()
    ).label;
    const gcustomer = (
      await this.grpcGeneralCustomerService
        .getGeneralCustomerLabel({ id: act.generalCustomer })
        .toPromise()
    ).label;
    const lab = (
      await this.grpcLabService.getLabLabel({ id: act.lab }).toPromise()
    ).label;
    const month = new Intl.DateTimeFormat('ru-Ru', { month: 'long' }).format(
      date,
    );

    const ar = [];
    ar.push(year, customer, gcustomer, lab, month, name);
    const path = await this.mkDir(ar);

    return path;
  }

  async uploadFileToYd(
    file: Buffer,
    path: string,
    name: string,
  ): Promise<void> {
    logger.verbose('upload-doc.evetn inside `docService`');

    try {
      await this.webDav.putFileContents(`${path}${name}`, file, {
        overwrite: true,
      });
    } catch (error) {
      logger.error(error);
    }
  }

  async downloadFileFromYd(
    filepath: string,
    filename: string,
  ): Promise<Buffer> {
    logger.verbose('download-doc.event inside `docService`');

    try {
      //   return await this.webDav.createReadStream(`${filepath}${filename}`);
      return await this.webDav.getFileContents(`${filepath}${filename}`);
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

  async createName(
    actId: string,
    title: string,
    name: string,
    mimtype: string,
  ): Promise<string> {
    logger.verbose('create-name.method');

    try {
      const docs = await this.docRepository.find({
        where: { act: { id: actId }, title: title },
      });

      let newname: string;

      const getName = async (version: number) => {
        logger.log(name);
        const nameArr = name.split('.');

        nameArr.splice(-1, 1);

        logger.log(mimtype);

        const typeArr = mimtype.split('/');
        const splittype = typeArr[typeArr.length - 1];

        return `${nameArr.toString()}.v${version}.${splittype}`;
      };

      if (docs && docs.length > 0) {
        const splitArr = docs[docs.length - 1].name.split('.v');
        const version = parseInt(splitArr[splitArr.length - 1]) + 1;

        newname = await getName(version);

        return newname;
      } else {
        newname = await getName(1);
        return newname;
      }
    } catch (error) {
      logger.error(error.message);
    }
  }
}
