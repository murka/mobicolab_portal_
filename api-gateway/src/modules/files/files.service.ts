import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcFilesClientOptions } from 'src/options/grpc-files.client.options';
import {
  FilesServiceClient,
  SavingData,
  File,
  docId,
} from 'src/models/build/files/files';
import { Observable } from 'rxjs';

@Injectable()
export class FilesService implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  constructor() {}

  @Client(grpcFilesClientOptions)
  private readonly filesClient: ClientGrpc;

  private grpcFilesService: FilesServiceClient;

  onModuleInit() {
    this.grpcFilesService = this.filesClient.getService<FilesServiceClient>(
      'FilesService',
    );
  }

  savingFile(data: SavingData): Observable<any> {
    this.logger.verbose('saving-doc.method');

    try {
      return this.grpcFilesService.saveDoc({
        actId: data.actId,
        docId: data.docId,
        doc: data.doc,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  downloadFile(data: docId): Promise<File> {
    this.logger.verbose('download-file');

    try {
      return this.grpcFilesService.downloadDoc(data).toPromise();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
