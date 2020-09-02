import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { environment } from "../../../environments/environment";
import { catchError, retry, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { GCustomerModel } from "src/app/shared/models/gcustomer.model";
import { GetGeneralCustomersForOptionGQL } from "src/types/generated";

@Injectable({
  providedIn: "root",
})
export class GeneralCustomerControlService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private readonly getGeneralCustomersOpt: GetGeneralCustomersForOptionGQL
  ) {}

  getGCustomers(): Observable<GCustomerModel[]> {
    // return this.http.get<GCustomerModel[]>(environment.baseURL + 'generalCustomer/')
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
    return this.getGeneralCustomersOpt
      .watch()
      .valueChanges.pipe(
        map(({ data }) => {
          return data.getGeneralCustomers.map(
            (item) => new GCustomerModel(item)
          );
        })
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postGCustomer(body: any) {
    return this.http
      .post(environment.baseURL + "generalCustomer/", body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  populateActsByGCustomerId(id: string): Observable<GCustomerModel> {
    return this.http
      .get<GCustomerModel>(environment.baseURL + "generalCustomer/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
