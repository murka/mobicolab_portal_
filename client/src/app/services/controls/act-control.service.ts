import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { environment } from "../../../environments/environment";
import { ActModel } from "src/app/shared/models/act.model";
import {
  GetActForItemGQL,
  GetActIdsGQL,
  GetActForDetailsGQL,
  PatchActGQL,
  PostActGQL,
  PostActMutation,
  GetActForDetailsQuery,
  GetWholeActGQL,
  GetWholeActQuery,
  PatchActMutation,
  GetAllActsGQL,
  GetAllActsQuery,
} from "../../../types/generated";
import { LabModel } from "src/app/shared/models/lab.model";

@Injectable({
  providedIn: "root",
})
export class ActControlService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private getActForItemQuery: GetActForItemGQL,
    private getActIdsQuery: GetActIdsGQL,
    private getActForDetailsQuery: GetActForDetailsGQL,
    private createAct: PostActGQL,
    private getWholeAct: GetWholeActGQL,
    private updateAct: PatchActGQL,
    private getAllActs: GetAllActsGQL
  ) {}

  getActsForItem(): Observable<ActModel[] | any> {
    return this.getActForItemQuery
      .watch()
      .valueChanges.pipe(
        map(({ data }) =>
          data.getActs.map((query) => {
            console.log(query);

            return new ActModel({
              id: query.id,
              name: query.name,
              status: query.status,
              lab: new LabModel({ label: query.lab.label }),
            });
          })
        )
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getActIds(): Observable<string[] | any> {
    return this.getActIdsQuery
      .watch()
      .valueChanges.pipe(map(({ data }) => data.getActs.map((act) => act.id)))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getActForDetails(id: string): Observable<GetActForDetailsQuery["getAct"]> {
    return this.getActForDetailsQuery
      .watch({ actId: id })
      .valueChanges.pipe(map(({ data }) => data.getAct))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getActs(): Observable<GetAllActsQuery["getActs"]> {
    return this.getAllActs
      .watch()
      .valueChanges.pipe(map(({ data }) => data.getActs))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getAct(id: string): Observable<GetWholeActQuery["getAct"]> {
    return this.getWholeAct
      .watch({ id: id })
      .valueChanges.pipe(map(({ data }) => data.getAct))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postAct(body: any): Observable<PostActMutation> {
    console.log(body);

    // return this.http
    //   .post(environment.baseURL + "acts/", body)
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
    return this.createAct
      .mutate({ data: body })
      .pipe(map(({ data }) => data))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postComment(id: string, body: any): Observable<ActModel> {
    return this.http
      .post<ActModel>(environment.baseURL + "acts/" + id + "/comments", body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  patchAct(body: any): Observable<PatchActMutation["updateAct"]> {
    // return this.http
    //   .patch<ActModel>(environment.baseURL + "acts/" + id, body)
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
    return this.updateAct
      .mutate({ data: body })
      .pipe(map(({ data }) => data.updateAct))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteAct(id: string): Observable<void> {
    return this.http
      .delete<void>(environment.baseURL + "acts/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  createDoc(id: string): Observable<ActModel> {
    return this.http
      .post<ActModel>(environment.baseURL + "file/" + id, id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  downloadDoc(actId: string, docId: number) {
    return this.http
      .get(environment.API_URI + "docs/download/" + actId + "/" + docId, {
        responseType: "blob",
      })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  uploadFile(url: string, file: File): Observable<ActModel> {
    let formData = new FormData();
    formData.append("upload", file);

    let params = new HttpParams();
    let headers = new HttpHeaders();

    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");

    const options = {
      params: params,
      reportProgress: true,
      header: headers,
    };

    return this.http
      .post<ActModel>(url, formData, options)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  newuploadFile(
    file: File,
    id: string,
    type: string,
    status: string
  ): Observable<ActModel> {
    let formData = new FormData();
    formData.append("file", file);

    let params = new HttpParams();
    let headers = new HttpHeaders();

    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");

    const options = {
      params: params,
      reportProgress: true,
      header: headers,
    };

    return this.http
      .post<ActModel>(
        environment.API_URI + "docs/create/" + id + "/" + type + "/" + status,
        formData,
        options
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  downloadScan(id: string) {
    return this.http
      .get(environment.baseURL + "file/scanAct/" + id, { responseType: "blob" })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  downloadProtocol(id: string) {
    return this.http
      .get(environment.baseURL + "file/protocol/" + id, {
        responseType: "blob",
      })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  downloadFinalProtocol(id: string) {
    return this.http
      .get(environment.baseURL + "file/protocolFinal/" + id, {
        responseType: "blob",
      })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteDoc(body, id: string, type: string) {
    return this.http
      .patch(environment.API_URI + "docs/delete/" + id, body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
