/* eslint-disable */
import { Observable } from 'rxjs';
import { Empty } from '../google/protobuf/empty';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface SavingData {
  actId: string;
  docId: string;
  doc: Uint8Array;
}

export interface docId {
  id: string;
}

export interface File {
  doc: Uint8Array;
  name: string;
}

export interface ApiGatewayServiceController {

  savingDoc(request: SavingData): void;

  downloadDoc(request: docId): Promise<File> | Observable<File> | File;

}

export interface ApiGatewayServiceClient {

  savingDoc(request: SavingData): Observable<Empty>;

  downloadDoc(request: docId): Observable<File>;

}

export function ApiGatewayServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['savingDoc', 'downloadDoc'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ApiGatewayService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ApiGatewayService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const API_GATEWAY_SERVICE_PACKAGE_NAME = 'api_gateway_service'
export const API_GATEWAY_SERVICE_NAME = 'ApiGatewayService';