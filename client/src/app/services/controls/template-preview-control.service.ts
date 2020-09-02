import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { TemplatePreviewClient } from "src/app/shared/protos/template-preview_pb_service";
import { TemplateList, Null } from "src/app/shared/protos/template-preview_pb";

@Injectable({
  providedIn: "root",
})
export class TemplatePreviewControlService {
  private client: TemplatePreviewClient;

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {
    this.client = new TemplatePreviewClient("http://192.168.1.6:8080");
  }

  async getAllTemplates(): Promise<TemplateList.AsObject> {
    return new Promise((resolve, reject) => {
      const req = new Null();
      this.client.getAllFiles(req, (err, responce: TemplateList) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          console.log(responce);

          resolve(responce.toObject());
        }
      });
    });
  }

  // getAllFiles() {
  //   return this.http
  //     .get(
  //       environment.URI + "/template-preview/all-files", {
  //         responseType: 'blob'
  //       }
  //     )
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }
}
