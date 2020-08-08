// package: template_preview
// file: template-preview.proto

import * as template_preview_pb from "./template-preview_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TemplatePreviewGetAllFiles = {
  readonly methodName: string;
  readonly service: typeof TemplatePreview;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof template_preview_pb.Null;
  readonly responseType: typeof template_preview_pb.TemplateList;
};

export class TemplatePreview {
  static readonly serviceName: string;
  static readonly GetAllFiles: TemplatePreviewGetAllFiles;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class TemplatePreviewClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getAllFiles(
    requestMessage: template_preview_pb.Null,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: template_preview_pb.TemplateList|null) => void
  ): UnaryResponse;
  getAllFiles(
    requestMessage: template_preview_pb.Null,
    callback: (error: ServiceError|null, responseMessage: template_preview_pb.TemplateList|null) => void
  ): UnaryResponse;
}

