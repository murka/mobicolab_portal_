import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs, { readFileSync } from 'fs';
import path = require('path');
import { ActService } from './act.service';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcFilesClient } from 'src/options/grpc-files-client';
import { FilesServiceClient } from 'src/models/build/files/files';
import { Act } from 'src/models/build/act/act';
import { Customer } from 'src/models/build/customer/customer';
import { GeneralCustomer } from 'src/models/build/general-customer/gneral-customer';
import { Lab } from 'src/models/build/lab/lab';
import { Tos } from 'src/models/build/tos/tos';

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
        name: data.act.name,
        customer: data.customer.fullname,
        general_customer: data.gcustomer.fullname,
        lab: data.lab.fullname,
        habitan: data.habitan,
        htype: data.htype,
        objectName: data.act.obName,
        place: data.act.place,
        date: data.act.datetime.date,
        time: data.act.datetime.time,
        method: data.act.method,
        toolType: data.act.toolType,
        climaticEnvironmental: data.act.climaticEnvironmental,
        planning: data.act.climaticEnvironmental,
        normativeDocument: data.act.normativeDocument,
        sampleType: data.act.sampleType,
        sample: data.act.sample,
        preparation: data.act.preparation,
        goal: data.act.goal,
        definedIndicators: data.act.definedIndicators,
        additions: data.act.additions,
        informationAboutSelection: data.act.informationAboutSelection,
        environmentalEngineer: data.act.environmentalEngineer,
        representative: data.act.representative,
        passedSample: data.act.passedSample,
      });

      doc.render();

      const buf = doc.getZip().generate({ type: 'nodebuffer' });

      this.logger.log(`before push`);

      this.grpcFilesService
        .pushDoc({
          actId,
          name: data.act.name,
          doc: buf,
          mimtype: 'application/docx',
          title: 'ACT',
        })
        .subscribe(() => this.logger.log(`after push`));
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getData(
    actId: string,
  ): Promise<{
    act: Act;
    customer: Customer;
    gcustomer: GeneralCustomer;
    lab: Lab;
    habitan: Tos['habitan'];
    htype: Tos['htype'];
  }> {
    this.logger.verbose('get-data.method');

    try {
      const act = await this.actService.getActForPdf(actId);

      const customer = await this.actService.getCustomerForPdf(act.customer);

      const gcustomer = await this.actService.getGeneralCustomerForPdf(
        act.generalCustomer,
      );

      const lab = await this.actService.getLabForPdf(act.lab);

      const tos = await this.actService.getTosForPdf(
        act.typeOfSample.htypes,
        act.typeOfSample.habitan,
      );

      const habitan = tos.habitan;

      const htype = tos.htype;

      return { act, customer, gcustomer, lab, habitan, htype };
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
