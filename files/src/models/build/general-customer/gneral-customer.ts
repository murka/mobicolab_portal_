/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface gcustomerId {
  id: string;
}

export interface Label {
  label: string;
}

export interface GeneralCustomer {
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

export interface GeneralCustomerServiceController {

  getGeneralCustomer(request: gcustomerId): Promise<GeneralCustomer> | Observable<GeneralCustomer> | GeneralCustomer;

  getGeneralCustomerLabel(request: gcustomerId): Promise<Label> | Observable<Label> | Label;

}

export interface GeneralCustomerServiceClient {

  getGeneralCustomer(request: gcustomerId): Observable<GeneralCustomer>;

  getGeneralCustomerLabel(request: gcustomerId): Observable<Label>;

}

export function GeneralCustomerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getGeneralCustomer', 'getGeneralCustomerLabel'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('GeneralCustomerService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('GeneralCustomerService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const GCUSTOMER_SERVICE_PACKAGE_NAME = 'gcustomer_service'
export const GENERAL_CUSTOMER_SERVICE_NAME = 'GeneralCustomerService';