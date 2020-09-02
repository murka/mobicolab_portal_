import { Injectable } from "@angular/core";
import {
  CreatAppGQL,
  CreatAppMutation,
  DeleteAppGQL,
  DeleteAppMutation,
  CreateAppCopyGQL,
  CreateAppCopyMutation,
} from "../../../types/generated";
import { map, catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApplicationControlService {
  constructor(
    private processHTTPMsgService: ProcessHTTPMsgService,
    private readonly createApp: CreatAppGQL,
    private readonly deleteApp: DeleteAppGQL,
    private readonly createAppCopy: CreateAppCopyGQL
  ) {}

  postApplication(): Observable<CreatAppMutation["createApplication"]> {
    return this.createApp
      .mutate()
      .pipe(map(({ data }) => data.createApplication))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postCopyApplication(
    body: any
  ): Observable<CreateAppCopyMutation["createAppCopy"]> {
    return this.createAppCopy
      .mutate({ data: body })
      .pipe(map(({ data }) => data.createAppCopy))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteApplication(
    id: string
  ): Observable<DeleteAppMutation["deleteApplication"]> {
    return this.deleteApp
      .mutate({ data: id })
      .pipe(map(({ data }) => data.deleteApplication))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
