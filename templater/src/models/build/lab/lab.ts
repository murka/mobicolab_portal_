/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface labId {
  id: string;
}

export interface Label {
  label: string;
}

export interface Lab {
  fullname: string;
  label: string;
  address: Address | undefined;
  tel: string;
  email: string;
}

export interface Address {
  zip: string;
  country: string;
  region: string;
  city: string;
  street: string;
  building: string;
  room: string;
}

export interface LabServiceController {

  getLab(request: labId): Promise<Lab> | Observable<Lab> | Lab;

  getLabLabel(request: labId): Promise<Label> | Observable<Label> | Label;

}

export interface LabServiceClient {

  getLab(request: labId): Observable<Lab>;

  getLabLabel(request: labId): Observable<Label>;

}

export function LabServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getLab', 'getLabLabel'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('LabService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('LabService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const LAB_SERVICE_PACKAGE_NAME = 'lab_service'
export const LAB_SERVICE_NAME = 'LabService';