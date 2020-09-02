import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ActsListComponent } from "./acts-list/acts-list.component";
import { ActDetailsComponent } from "./act-details/act-details.component";
import { ActFormComponent } from "./act-form/act-form.component";
import { ActResolver } from "../services/resolve/act-resolver.service";
import { RulesComponent } from "./rules/rules.component";
import { RulesListComponent } from "./rules/rules-list/rules-list.component";

const routes: Routes = [
  // { path: "", redirectTo: "", pathMatch: "full" },
  { path: "", component: RulesComponent },
  { path: "rules/list", component: RulesListComponent },
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
