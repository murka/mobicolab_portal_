import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../process-httpmsg.service";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { CustomerModel } from "src/app/shared/models/customer.model";
import { GCustomerModel } from "src/app/shared/models/gcustomer.model";
import { LabModel } from "src/app/shared/models/lab.model";
import { generalOptionModel } from "src/app/shared/models/generalOptions.model";
import { Habitan } from "src/app/shared/models/habitan.model";
import {
  GetLabsForOptionGQL,
  GetCustomersForOptionGQL,
  GetGeneralCustomersForOptionGQL,
  GetHabitansOptionGQL,
  CreateCustomerThroughOptionGQL,
  CreateGeneralCustomerThroughOptionGQL,
  CreateLabThroughOptionGQL,
  PatchCustomerThroughOptionGQL,
  PatchGeneralCustomerThroughOptionGQL,
  PatchLabThroughOptionGQL,
  GetWholeCustomerGQL,
  GetGeneralCustomerGQL,
  GetLabGQL,
  CreateHabitanGQL,
  CreateHTypeGQL,
  CreateHTypeMutation,
  UpdateHabitanGQL,
  UpdateHTypeGQL,
  GetWholeCustomerQuery,
  GetGeneralCustomerQuery,
  GetLabQuery,
  UpdateHTypeMutation,
} from "src/types/generated";
import { Apollo } from "apollo-angular";
import { DocumentNode } from "graphql";

@Injectable({
  providedIn: "root",
})
export class ActFormControlService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private readonly getLabsOpt: GetLabsForOptionGQL,
    private readonly getCusteromsOpt: GetCustomersForOptionGQL,
    private readonly getGeneralCustomersOpt: GetGeneralCustomersForOptionGQL,
    private readonly getHabitansOpt: GetHabitansOptionGQL,
    private readonly postCustomerOpt: CreateCustomerThroughOptionGQL,
    private readonly postGeneralCustomerOpt: CreateGeneralCustomerThroughOptionGQL,
    private readonly postLabOpt: CreateLabThroughOptionGQL,
    private readonly updateCustomerOpt: PatchCustomerThroughOptionGQL,
    private readonly updateGeneralCusomerOpt: PatchGeneralCustomerThroughOptionGQL,
    private readonly updateLabOpt: PatchLabThroughOptionGQL,
    private readonly getWholeCustomer: GetWholeCustomerGQL,
    private readonly getGeneralCustomer: GetGeneralCustomerGQL,
    private readonly getLab: GetLabGQL,
    private readonly postHabitan: CreateHabitanGQL,
    private readonly postHType: CreateHTypeGQL,
    private readonly updateHabitan: UpdateHabitanGQL,
    private readonly updateHType: UpdateHTypeGQL,
    private readonly apollo: Apollo
  ) {}

  // getTypeOfSamples(): Observable<TypeOfSample[]> {
  //   return this.http.get<TypeOfSample[]>(environment.baseURL + 'typeOfSample/')
  //   .pipe(catchError(this.processHTTPMsgService.handleError));
  // }

  postActItem(
    path: string,
    body: any
  ): Observable<generalOptionModel | Habitan | { id: string; label: string }> {
    console.log("post");

    if (path === "customer") {
      console.log("post");

      return this.postCustomerOpt
        .mutate({ data: <CustomerModel>body })
        .pipe(map(({ data }) => data.createCustomer))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "generalCustomer") {
      return this.postGeneralCustomerOpt
        .mutate({ data: <GCustomerModel>body })
        .pipe(map(({ data }) => data.createGeneralCustomer))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "lab") {
      console.log("lab");

      return this.postLabOpt
        .mutate({ data: <LabModel>body })
        .pipe(map(({ data }) => data.createLab))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "typeOfSample") {
      return this.postHabitan
        .mutate({ data: body.label })
        .pipe(map(({ data }) => data.createHabitan))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    return this.http
      .post<generalOptionModel | Habitan>(
        environment.baseURL + path + "/",
        body
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  patchtActItem(
    path: string,
    id: string,
    body: any
  ): Observable<
    | generalOptionModel
    | Habitan
    | UpdateHTypeMutation["updateHabitansType"]
    | { id: string; label: string }
  > {
    if (path === "customer") {
      return this.updateCustomerOpt
        .mutate({ data: { ...(<CustomerModel>body), id: id } })
        .pipe(map(({ data }) => data.updateCustomer))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "generalCustomer") {
      return this.updateGeneralCusomerOpt
        .mutate({ data: { ...(<GCustomerModel>body), id: id } })
        .pipe(map(({ data }) => data.updateGeneralCustomer))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "lab") {
      return this.updateLabOpt
        .mutate({ data: { ...(<LabModel>body), id: id } })
        .pipe(map(({ data }) => data.updateLab))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "typeOfSample") {
      return this.updateHabitan
        .mutate({ id: id, label: body })
        .pipe(map(({ data }) => data.updateHabitan))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "htype") {
      return this.updateHType
        .mutate({ id: id, label: body })
        .pipe(map(({ data }) => data.updateHabitansType))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    return this.http
      .patch<generalOptionModel>(environment.baseURL + path + "/" + id, body)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postActItemArray(
    path: string,
    id: string,
    body: any
  ): Observable<CreateHTypeMutation> {
    // return this.http
    //   .post(environment.baseURL + path + "/" + id, body)
    //   .pipe(catchError(this.processHTTPMsgService.handleError));
    return this.postHType
      .mutate({
        data: { habitanId: id, label: body.value },
      })
      .pipe(map(({ data }) => data))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getItems(
    path: string
  ): Observable<
    | generalOptionModel[]
    | { id: string; label: string }[]
    | {
        id: string;
        label: string;
        htypes: { id: string; label: string }[];
      }[]
  > {
    console.log(`getItmes ${path}`);

    if (path === "lab") {
      return this.getLabsOpt.watch().valueChanges.pipe(
        map(({ data }) => {
          return data.getLabs;
        })
      );
    }

    if (path === "customer") {
      return <Observable<{ id: string; label: string }[]>>this.getCusteromsOpt
        .watch()
        .valueChanges.pipe(map(({ data }) => data.getCustomers))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "generalCustomer") {
      return <Observable<{ id: string; label: string }[]>>(
        this.getGeneralCustomersOpt
          .watch()
          .valueChanges.pipe(map(({ data }) => data.getGeneralCustomers))
          .pipe(catchError(this.processHTTPMsgService.handleError))
      );
    }

    if (path === "typeOfSample") {
      return <
        Observable<
          {
            id: string;
            label: string;
            htypes: { id: string; label: string }[];
          }[]
        >
      >this.getHabitansOpt
        .watch()
        .valueChanges.pipe(
          map(({ data }) => {
            console.log(data.getAllHabitans);

            return data.getAllHabitans;
          })
        )
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    return this.http
      .get<generalOptionModel[]>(environment.baseURL + path)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getItem(
    path: string,
    id: string
  ): Observable<
    | any
    | GetGeneralCustomerQuery["getGeneralCustomer"]
    | GetLabQuery["getLab"]
    | GetWholeCustomerQuery["customer"]
    | generalOptionModel
  > {
    if (path === "customer") {
      return this.getWholeCustomer
        .watch({ data: id })
        .valueChanges.pipe(map(({ data }) => data.customer))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path == "generalCustomer") {
      return this.getGeneralCustomer
        .watch({ data: id })
        .valueChanges.pipe(map(({ data }) => data.getGeneralCustomer))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    if (path === "lab") {
      return this.getLab
        .watch({ data: id })
        .valueChanges.pipe(map(({ data }) => data.getLab))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    return this.http
      .get<CustomerModel | GCustomerModel | LabModel | generalOptionModel>(
        environment.baseURL + path + "/" + id
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteItem(patch: string, id: string): Observable<void> {
    return this.http
      .delete<void>(environment.baseURL + patch + "/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
