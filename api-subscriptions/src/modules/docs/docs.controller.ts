import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { DocsService } from './docs.service';
import { Observable } from 'rxjs';

@Controller('docs')
export class DocsController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly ds: DocsService) {}

  @GrpcMethod('SubscriptionsService')
  async pushDoc(data: { docId: string, actId: string, mutation: string }): Promise<void> {
    this.logger.verbose('push-doc.grpc-method');

    try {
      await this.ds.publishDoc(data.docId, data.actId, data.mutation);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @GrpcStreamMethod('SubscriptionsService')
  pushDocs(data$: Observable<{ docId: string, actId: string, mutation: string }>): void {
    this.logger.verbose('push-docs.grpc-method');

    data$.subscribe(data => {
        this.ds.publishDoc(data.docId, data.actId, data.mutation)
    })
  }
}