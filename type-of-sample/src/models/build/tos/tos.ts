/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface Ids {
  habitanId: string;
  htypeId: string;
}

export interface Tos {
  habitan: string;
  htype: string;
}

export interface TOSServiceController {

  getTOS(request: Ids): Promise<Tos> | Observable<Tos> | Tos;

}

export interface TOSServiceClient {

  getTOS(request: Ids): Observable<Tos>;

}

export function TOSServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getTOS'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('TOSService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('TOSService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const TOS_SERVICE_PACKAGE_NAME = 'tos_service'
export const T_OS_SERVICE_NAME = 'TOSService';