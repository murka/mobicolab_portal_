import { Injectable } from "@angular/core";
import { ApiGatewayServiceClient } from "src/app/shared/protos/build/api-gateway_pb_service";
import {
  SavingData,
  docId,
  File as DocFile,
} from "../../shared/protos/build/api-gateway_pb";
import { Observable, Observer, from } from "rxjs";
import {
  DroppDocGQL,
  DroppDocMutation,
  TitlingDocGQL,
  TitlingDocMutation,
  RemoveDocGQL,
  RemoveDocMutation,
} from "src/types/generated";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { map, catchError, concatMap } from "rxjs/operators";
import { ItemFile } from "src/app/acts/act-details/docs/docs.component";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class FilesControlService {
  private client: ApiGatewayServiceClient;

  constructor(
    private processHTTPMsgService: ProcessHTTPMsgService,
    private readonly droppDoc: DroppDocGQL,
    private readonly titlingDoc: TitlingDocGQL,
    private readonly deleteDoc: RemoveDocGQL
  ) {
    this.client = new ApiGatewayServiceClient(environment.ENVOI);
  }

  downloadFile(id: string): Promise<DocFile.AsObject> {
    const req = new docId();
    req.setId(id);

    return new Promise((resovlve, rej) => {
      console.log("inside promise");

      this.client.downloadDoc(req, (err, res) => {
        console.log(res);

        if (err) rej(err);

        resovlve(res.toObject());
      });
    });
  }

  savinAllDoc(files: ItemFile[], actId: string): Observable<any> {
    return from(files).pipe(
      concatMap((item) => {
        console.log("switch");
        return new Observable((observer) => {
          observer.next(this.savintDoc(actId, item.file, item.id));
        });
      })
    );
  }

  async savintDoc(actId: string, doc: File, docId: string): Promise<any> {
    const req = new SavingData();
    req.setActid(actId);
    req.setDocid(docId);
    const reader = new FileReader();
    let buf: Uint8Array;
    reader.onload = (function (ev) {
      return function (e) {
        buf = new Uint8Array(<ArrayBuffer>reader.result);
        req.setDoc(buf);
      };
    })(doc);
    reader.readAsArrayBuffer(doc);
    req.setDoc(buf);
    const WaitFor = () => {
      if (!req.getDoc()) {
        setTimeout(WaitFor, 1000);
      } else {
        return new Promise((resolve, rej) => {
          this.client.savingDoc(req, null, (err, res) => {
            if (err) rej(new Error(err.message));
            console.log(res);

            resolve(res);
          });
        });
      }
    };

    return WaitFor();
  }

  postDroppDoc(
    actId: string,
    name: string,
    mimetype: string
  ): Observable<DroppDocMutation["droppDoc"]> {
    return this.droppDoc
      .mutate({ actId, name, mimetype })
      .pipe(map(({ data }) => data.droppDoc))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postTitleDoc(
    actId: string,
    docId: string,
    name: string,
    title: string,
    mimtype: string
  ): Observable<TitlingDocMutation["titlingDoc"]> {
    return this.titlingDoc
      .mutate({ data: { actId, docId, name, title, mimtype } })
      .pipe(map(({ data }) => data.titlingDoc))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  removeDoc(docId: string): Observable<RemoveDocMutation["removeDoc"]> {
    return this.deleteDoc
      .mutate({ docId })
      .pipe(map(({ data }) => data.removeDoc))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
