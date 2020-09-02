// package: api_gateway_service
// file: api-gateway.proto

import * as api_gateway_pb from "./api-gateway_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ApiGatewayServiceSavingDoc = {
  readonly methodName: string;
  readonly service: typeof ApiGatewayService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_gateway_pb.SavingData;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type ApiGatewayServicedownloadDoc = {
  readonly methodName: string;
  readonly service: typeof ApiGatewayService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_gateway_pb.docId;
  readonly responseType: typeof api_gateway_pb.File;
};

export class ApiGatewayService {
  static readonly serviceName: string;
  static readonly SavingDoc: ApiGatewayServiceSavingDoc;
  static readonly downloadDoc: ApiGatewayServicedownloadDoc;
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

export class ApiGatewayServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  savingDoc(
    requestMessage: api_gateway_pb.SavingData,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  savingDoc(
    requestMessage: api_gateway_pb.SavingData,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  downloadDoc(
    requestMessage: api_gateway_pb.docId,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_gateway_pb.File|null) => void
  ): UnaryResponse;
  downloadDoc(
    requestMessage: api_gateway_pb.docId,
    callback: (error: ServiceError|null, responseMessage: api_gateway_pb.File|null) => void
  ): UnaryResponse;
}

