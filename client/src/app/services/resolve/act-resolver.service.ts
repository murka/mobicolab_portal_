import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { ActControlService } from "../controls/act-control.service";
import { Injectable } from "@angular/core";
import { ActModel } from '../../shared/models/act.model';

@Injectable({providedIn: 'root'})
export class ActResolver implements Resolve<ActModel> {
  constructor(private acs: ActControlService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ActModel | Promise<ActModel> | Observable<ActModel> {
    return this.acs.getAct(route.params["id"]);
  }
}
