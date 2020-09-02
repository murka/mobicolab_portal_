import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs, { readFileSync } from 'fs';
import path = require('path');
import { ActService } from './act.service';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcFilesClient } from 'src/options/grpc-files-client';
import { FilesServiceClient } from 'src/models/build/files/files';

const unoconv = require('awesome-unoconv');

const libre = require('libreoffice-convert');

@Injectable()
export class CreatorService implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  @Client(grpcFilesClient)
  private readonly filesClient: ClientGrpc;

  private grpcFilesService: FilesServiceClient;

  constructor(private readonly actService: ActService) {}

  onModuleInit() {
    this.grpcFilesService = this.filesClient.getService<FilesServiceClient>(
      'FilesService',
    );
  }

  async createDoc(actId: string, filepath: string) {
    this.logger.verbose('create-pdf.method');

    try {
      const content = readFileSync(
        path.join(__dirname, '../../../', filepath),
        'binary',
      );
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);

      const data = await this.getData(actId);

      doc.setData({
        // name
        customer: data.customer,
        // general_customer
        // lab
        // typeOfSample
        // objectName
        // place
        // datetime
        // method
        // toolType
        // climaticEnvironmental
        // planning
        // normativeDocument
        // sampleType
        // sample
        // preparation
        // goal
        // definedIndicators
        // additions
        // informationAboutSelection
        // environmentalEngineer
        // representative
        // passedSample
        // createdAt
        // updatedAt
        // files
        // status
        // applications
      });

      doc.render();

      const buf = doc.getZip().generate({ type: 'nodebuffer' });

      const out = Buffer.from(buf);

      this.logger.log(`before push`);

      this.grpcFilesService
        .pushDoc({
          actId,
          name: data.name,
          doc: buf,
          mimtype: 'docx',
          title: 'ACT',
        })
        .subscribe(() => this.logger.log(`after push`));

      const input3 = fs.writeFileSync('input.docx', buf);

      unoconv
        .convert('input.docx', 'output.pdf')
        .then(result => this.logger.log(result));

      libre.convert(input3, '.pdf', undefined, (err, done) => {
        if (err) this.logger.error(err);

        fs.writeFileSync('output1.pdf', done);
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getData(actId: string): Promise<{ customer: string; name: string }> {
    this.logger.verbose('get-data.method');

    try {
      const act = await this.actService.getActForPdf(actId);

      const customer = await this.actService.getCustomerForPdf(act.id);

      this.logger.log(act);

      this.logger.log(customer);

      return { customer: customer.fullname, name: act.name };
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
