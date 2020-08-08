import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TemplateService } from './template.service';
import {
  TemplateModel,
  TemplateListModel,
  Item,
} from './models/interfaces/template-model';
import { Observable, of, from } from 'rxjs';
import path from 'path';
import fs from 'fs';

@Controller('template')
export class TemplateController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly _ts: TemplateService) {}

  @GrpcMethod('TemplateService')
  getAllTemplate(): TemplateListModel {
    this.logger.verbose('get-all-files.method');

    return this._ts.getAllTemplate();
  }
}
