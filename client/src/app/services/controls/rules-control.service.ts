import { Injectable } from "@angular/core";
import {
  CreateLabTosRuleGQL,
  CreateLabTosRuleMutation,
  GetGeneratePathGQL,
  GetGeneratePathQuery,
  UpdateLabTosRuleGQL,
  UpdateLabTosRuleMutation,
} from "../../../types/generated";
import { map, catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RulesControlService {
  constructor(
    private processHTTPMsgService: ProcessHTTPMsgService,
    private readonly createRuleLabTos: CreateLabTosRuleGQL,
    private readonly getGeneratePath: GetGeneratePathGQL,
    private readonly updateGeneratePath: UpdateLabTosRuleGQL
  ) {}

  getRuleLabTosTemplate(
    labId: string,
    typeId: string
  ): Observable<GetGeneratePathQuery["getLabTypeOfSampleTemplate"]> {
    return this.getGeneratePath
      .watch({ labId, typeId })
      .valueChanges.pipe(map(({ data }) => data.getLabTypeOfSampleTemplate))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postRuleLabTOSTemplate(
    labId: string,
    typeId: string,
    path: string
  ): Observable<CreateLabTosRuleMutation["createLabTypeOfSampleTemplate"]> {
    console.log(labId, typeId, path);

    return this.createRuleLabTos
      .mutate({ data: { labId, typeId, path } })
      .pipe(map(({ data }) => data.createLabTypeOfSampleTemplate))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  patchRuleLabTOSTemplate(
    labId: string,
    typeId: string,
    path: string
  ): Observable<UpdateLabTosRuleMutation["updateLabTypeOfSampleTemplate"]> {
    return this.updateGeneratePath
      .mutate({ data: { labId, typeId, path } })
      .pipe(map(({ data }) => data.updateLabTypeOfSampleTemplate))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
