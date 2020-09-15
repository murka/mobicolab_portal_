import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcFilesClientOptions } from 'src/options/grpc-files.client.options';
import { FilesServiceClient, DocList, Doc as DocBuild } from 'src/models/build/files/files';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doc } from './models/doc.model';

@Injectable()
export class DocsService implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  @Client(grpcFilesClientOptions)
  private readonly filesClient: ClientGrpc;

  private grpcFilesService: FilesServiceClient;

  constructor(@Inject('PUB_SUB') private readonly pubsub: PubSub) {}

  onModuleInit() {
    this.grpcFilesService = this.filesClient.getService<FilesServiceClient>(
      'FilesService',
    );
  }

  publishDoc(docId: string, actId: string, mutation: string): void {
    this.logger.verbose('publish-doc');

    try {
      this.grpcFilesService.getDocByType({ id: docId }).subscribe(doc => {
        this.pubsub.publish(`Act_${actId}_added`, {
          changeDocs: doc,
        });
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  getDocs(actId: string): Observable<DocBuild[]> {
    this.logger.verbose('get-docs');

    try {
      return this.grpcFilesService.getDocs({ id: actId }).pipe(
        map((data: DocList) => {
          this.logger.log(data)
          return data.item;
        }),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
