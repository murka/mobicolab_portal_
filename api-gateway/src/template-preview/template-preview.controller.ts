import { Controller, Logger, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { ReadStream } from 'fs';

export interface AllFiles {
  lab: string;
  type: string;
  file: ReadStream;
}

interface TemplatePreviewClient {
  getAllFiles(): Observable<AllFiles>;
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
    >('TemplatePreview');
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
  async getAllFiles(): Promise<AllFiles[]> {
    this.logger.verbose('get-all-files.method');

    const files = await this.templatePreviewClient
      .getAllFiles()
      .pipe(toArray())
      .toPromise();

    return files;
  }
}
