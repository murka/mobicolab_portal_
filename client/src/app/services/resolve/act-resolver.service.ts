import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { ActControlService } from "../controls/act-control.service";
import { Injectable } from "@angular/core";
import { ActModel } from "../../shared/models/act.model";
import { GetWholeActQuery } from "src/types/generated";
import { take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ActResolver implements Resolve<GetWholeActQuery["getAct"]> {
  constructor(private acs: ActControlService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | GetWholeActQuery["getAct"]
    | Promise<GetWholeActQuery["getAct"]>
    | Observable<GetWholeActQuery["getAct"]> {
    console.log("resolver");

    return this.acs.getAct(route.params["id"]).pipe(take(1));
  }
}
