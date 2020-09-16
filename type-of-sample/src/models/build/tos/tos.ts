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

export interface TosServiceController {

  getTos(request: Ids): Promise<Tos> | Observable<Tos> | Tos;

}

export interface TosServiceClient {

  getTos(request: Ids): Observable<Tos>;

}

export function TosServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getTos'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('TosService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('TosService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const TOS_SERVICE_PACKAGE_NAME = 'tos_service'
export const TOS_SERVICE_NAME = 'TosService';