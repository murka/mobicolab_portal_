import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { TemplatePreviewClient } from 'src/app/shared/protos/template-preview_pb_service';
import { File, AllFiles, Null } from 'src/app/shared/protos/template-preview_pb'

@Injectable({
  providedIn: "root",
})
export class TemplatePreviewControlService {
  client: TemplatePreviewClient

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
  ) {
    this.client = new TemplatePreviewClient("http://localhost:50020")
  }

  getAllFiles(): Promise<AllFiles> {
    return new Promise((resolve, reject) => {
      const req = new Null
      this.client.getAllFiles(req, null, (err, response: AllFiles) => {
        if (err) {
          console.log(err);
          reject(err)
        }

        resolve(response)
      })
    })
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
