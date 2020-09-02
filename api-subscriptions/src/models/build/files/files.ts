/* eslint-disable */
import { Observable } from 'rxjs';
import { Empty } from '../google/protobuf/empty';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface data {
  actId: string;
  name: string;
  title: string;
  mimtype: string;
  doc: Uint8Array;
}

export interface SavingData {
  actId: string;
  docId: string;
  doc: Uint8Array;
}

export interface docId {
  id: string;
}

export interface Doc {
  id: string;
  ydUrl: string;
  name: string;
  title: string;
  downloadable: boolean;
}

export interface actId {
  id: string;
}

export interface DocList {
  item: Doc[];
}

export interface File {
  doc: Uint8Array;
  name: string;
}

export interface FilesServiceController {

  pushDoc(request: data): void;

  saveDoc(request: SavingData): void;

  getDocByType(request: docId): Promise<Doc> | Observable<Doc> | Doc;

  getDocs(request: actId): Promise<DocList> | Observable<DocList> | DocList;

  downloadDoc(request: docId): Promise<File> | Observable<File> | File;

}

export interface FilesServiceClient {

  pushDoc(request: data): Observable<Empty>;

  saveDoc(request: SavingData): Observable<Empty>;

  getDocByType(request: docId): Observable<Doc>;

  getDocs(request: actId): Observable<DocList>;

  downloadDoc(request: docId): Observable<File>;

}

export function FilesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['pushDoc', 'saveDoc', 'getDocByType', 'getDocs', 'downloadDoc'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('FilesService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('FilesService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const FILES_SERVICE_PACKAGE_NAME = 'files_service'
export const FILES_SERVICE_NAME = 'FilesService';