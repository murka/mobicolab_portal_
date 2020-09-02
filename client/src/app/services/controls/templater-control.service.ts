import { Injectable } from "@angular/core";
import { CreatePdfGQL, CreatePdfMutation } from "src/types/generated";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TemplaterControlService {
  constructor(
    private processHTTPMsgService: ProcessHTTPMsgService,
    private readonly createPdf: CreatePdfGQL
  ) {}

  postNewPdf(
    actId: string,
    path: string
  ): Observable<CreatePdfMutation["createPdf"]> {
    return this.createPdf
      .mutate({ actId, path })
      .pipe(map(({ data }) => data.createPdf))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
