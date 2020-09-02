/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface customerId {
  id: string;
}

export interface Label {
  label: string;
}

export interface Customer {
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

export interface CustomerServiceController {

  getCustomer(request: customerId): Promise<Customer> | Observable<Customer> | Customer;

  getCustomerLabel(request: customerId): Promise<Label> | Observable<Label> | Label;

}

export interface CustomerServiceClient {

  getCustomer(request: customerId): Observable<Customer>;

  getCustomerLabel(request: customerId): Observable<Label>;

}

export function CustomerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getCustomer', 'getCustomerLabel'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('CustomerService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('CustomerService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const CUSTOMER_SERVICE_PACKAGE_NAME = 'customer_service'
export const CUSTOMER_SERVICE_NAME = 'CustomerService';