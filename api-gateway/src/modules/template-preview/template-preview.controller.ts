import { Controller, Logger, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { toArray } from 'rxjs/operators';
import { TemplateModel } from './models/interfaces/template-model';
import { Observable } from 'rxjs';

interface TemplatePreviewClient {
  getAllTemplate(data: null): Observable<Object>;
}

@Controller('template-preview')
export class TemplatePreviewController implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private templatePreviewClient: TemplatePreviewClient;

  constructor(
    @Inject('TEMPLATE_PREVIEW_PACKAGE') private readonly tpClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.templatePreviewClient = this.tpClient.getService<
      TemplatePreviewClient
    >('TemplateService');
  }

  // @Get('all-files')
  // async getAllFiles(): Promise<AllFiles[]> {
  //   this.logger.verbose('get-all-files.method');

  //   let file: AllFiles;

  //   const test = await this.templatePreviewClient
  //     .getAllFiles()
  //     .pipe(toArray())
  //     .toPromise();

  //   return test;
  // }

  @GrpcMethod('TemplatePreview')
  async getAllFiles(): Promise<object> {
    this.logger.verbose('get-all-files.method');

    const template = await this.templatePreviewClient
      .getAllTemplate(null)
      .toPromise();

    return template;
  }
}
