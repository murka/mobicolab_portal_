import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { LabModel } from "src/app/shared/models/lab.model";

@Injectable({
  providedIn: "root",
})
export class LabsControlService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getLabs(): Observable<LabModel[]> {
    return this.http
      .get<LabModel[]>(environment.baseURL + "labs/")
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postLab(body: any) {
    return this.http
      .post(environment.baseURL + "labs/", body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
