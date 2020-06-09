import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { InjectWebDAV, WebDAV } from 'nestjs-webdav';

import { Doc } from './models/doc.model';
import { PrismaService } from 'src/services/prisma.service';
import { ReadStream } from 'fs';

const logger = new Logger('docService');

@Injectable()
export class DocsService {
  constructor(
    @InjectModel('act') private readonly actModel: Model<any>,
    @InjectModel('customer') private readonly customertModel: Model<any>,
    @InjectModel('gcustomer') private readonly gcustomerModel: Model<any>,
    @InjectModel('lab') private readonly labModel: Model<any>,
    @InjectWebDAV() private readonly webDav: WebDAV,
    private prisma: PrismaService,
  ) {}

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

    const doc = await this.actModel
      .findById(actId)
      .populate('customer', this.customertModel)
      .populate('generalCustomer', this.gcustomerModel)
      .populate('lab', this.labModel)
      .exec()
      .catch(err => logger.error(err));
    const name = doc.name;
    const date = new Date(doc.datetime.date);
    const year = date.getFullYear();
    const customer = doc.customer.label;
    const gcustomer = doc.generalCustomer.label;
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

      await this.webDav.putFileContents(`${path}${name}`, file,);
     
    } catch (error) {
      logger.error(error);
    }
  }

  async downloadFileFromYd(filepath: string, filename: string): Promise<ReadStream> {
    logger.verbose('download-doc.event inside `docService`')

    try {
      return await this.webDav.createReadStream(`${filepath}${filename}`)
    } catch(e) {
      logger.error(e)
    }
  }

  async deleteFileFromYd(filepath: string, filename: string) {
    logger.verbose('delete-doc.event inside `docService`')
    
    try {
      await this.webDav.deleteFile(`${filepath}${filename}`)
    } catch(e) {
      logger.error(e)
    }
  }
}
