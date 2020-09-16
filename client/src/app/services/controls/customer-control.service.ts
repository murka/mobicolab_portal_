import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { environment } from "../../../environments/environment";
import { catchError, map, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { CustomerModel } from "src/app/shared/models/customer.model";
import {
  GetCustomersWithActsGQL,
  GetCustomersWithActsQuery,
} from "src/types/generated";
import { ActModel } from "src/app/shared/models/act.model";

@Injectable({
  providedIn: "root",
})
export class CustomerControlService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private readonly getCustomersWithActs: GetCustomersWithActsGQL
  ) {}

  getCustomers(): Observable<GetCustomersWithActsQuery> {
    // return this.http.get<CustomerModel[]>(environment.baseURL + 'customer/')
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
    return this.getCustomersWithActs
      .watch()
      .valueChanges.pipe(map(({ data }) => data))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postCustomer(body: any) {
    return this.http
      .post(environment.baseURL + "customer/", body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCustomerWithGCustomers(id: string): Observable<CustomerModel> {
    return this.http
      .get<CustomerModel>(environment.baseURL + "customer/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
