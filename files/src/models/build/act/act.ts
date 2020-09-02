/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface actId {
  id: string;
}

export interface ActToFile {
  name: string;
  customer: string;
  generalCustomer: string;
  lab: string;
  datetime: DateTime | undefined;
}

export interface Act {
  id: string;
  name: string;
  customer: string;
  generalCustomer: string;
  lab: string;
  typeOfSample: TypeOfSample | undefined;
  obName: string;
  place: string;
  datetime: DateTime | undefined;
  method: string;
  toolType: string;
  climaticEnvironmental: string;
  planning: string;
  normativeDocument: string[];
  sampleType: string;
  sample: string[];
  preparation: string[];
  goal: string;
  definedIndicators: string[];
  additions: string;
  informationAboutSelection: string;
  environmentalEngineer: string;
  representative: string;
  passedSample: string;
  applications: Application[];
}

export interface TypeOfSample {
  habitan: string;
  htypes: string;
}

export interface DateTime {
  date: string;
  time: string;
}

export interface Application {
  place: string;
  datetime: DateTime | undefined;
}

export interface ActServiceController {

  getAct(request: actId): Promise<Act> | Observable<Act> | Act;

  getActToFile(request: actId): Promise<ActToFile> | Observable<ActToFile> | ActToFile;

}

export interface ActServiceClient {

  getAct(request: actId): Observable<Act>;

  getActToFile(request: actId): Observable<ActToFile>;

}

export function ActServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getAct', 'getActToFile'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ActService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ActService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const ACT_SERVICE_PACKAGE_NAME = 'act_service'
export const ACT_SERVICE_NAME = 'ActService';