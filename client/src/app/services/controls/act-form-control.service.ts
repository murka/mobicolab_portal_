import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";
import { CustomerModel } from "src/app/shared/models/customer.model";
import { GCustomerModel } from "src/app/shared/models/gcustomer.model";
import { LabModel } from "src/app/shared/models/lab.model";
import { generalOptionModel } from "src/app/shared/models/generalOptions.model";
import { TypeOfSample } from "src/app/shared/models/type-sample.model";

@Injectable({
  providedIn: "root"
})
export class ActFormControlService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  // getTypeOfSamples(): Observable<TypeOfSample[]> {
  //   return this.http.get<TypeOfSample[]>(environment.baseURL + 'typeOfSample/')
  //   .pipe(catchError(this.processHTTPMsgService.handleError));
  // }

  postActItem(
    path: string,
    body: object
  ): Observable<
    | CustomerModel
    | GCustomerModel
    | LabModel
    | generalOptionModel
    | TypeOfSample
  > {
    return this.http
      .post<
        | CustomerModel
        | GCustomerModel
        | LabModel
        | generalOptionModel
        | TypeOfSample
      >(environment.baseURL + path + "/", body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  patchtActItem(
    path: string,
    id: string,
    body: object
  ): Observable<
    | CustomerModel
    | GCustomerModel
    | LabModel
    | generalOptionModel
    | TypeOfSample
  > {
    return this.http
      .patch<CustomerModel | GCustomerModel | LabModel | generalOptionModel>(
        environment.baseURL + path + "/" + id,
        body
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postActItemArray(path: string, id: string, body: object): Observable<any> {
    return this.http
      .post(environment.baseURL + path + "/" + id, body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postActItemsFromArray(
    path: string,
    body: object[]
  ): Observable<void | Object> {
    return this.http
      .post(environment.baseURL + path + "/many", body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getItems(
    path: string
  ): Observable<
    | CustomerModel[]
    | GCustomerModel[]
    | LabModel[]
    | generalOptionModel[]
    | TypeOfSample[]
  > {
    return this.http
      .get<
        CustomerModel[] | GCustomerModel[] | LabModel[] | generalOptionModel[]
      >(environment.baseURL + path)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getItem(
    path: string,
    id: string
  ): Observable<
    CustomerModel | GCustomerModel | LabModel | generalOptionModel
  > {
    return this.http
      .get<CustomerModel | GCustomerModel | LabModel | generalOptionModel>(
        environment.baseURL + path + "/" + id
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteItem(patch: string, id: string): Observable<void> {
    return this.http
      .delete<void>(environment.baseURL + patch + "/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
