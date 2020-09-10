import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "acts",
    loadChildren: () => import("./acts/acts.module").then((m) => m.ActsModule),
  },
  { path: "", redirectTo: "acts", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
