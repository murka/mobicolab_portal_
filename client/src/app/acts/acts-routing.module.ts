import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ActsListComponent } from "./acts-list/acts-list.component";
import { ActDetailsComponent } from "./act-details/act-details.component";
import { ActFormComponent } from "./act-form/act-form.component";
import { ActResolver } from "../services/resolve/act-resolver.service";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: ActsListComponent },
  { path: "details/:id", component: ActDetailsComponent },
  { path: "create", component: ActFormComponent },
  {
    path: "update/:id",
    component: ActFormComponent,
    resolve: { act: ActResolver },
    data: { update: true },
  },
  {
    path: "copy/:id",
    component: ActFormComponent,
    resolve: { act: ActResolver },
    data: { copy: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActsRoutingModule {}
