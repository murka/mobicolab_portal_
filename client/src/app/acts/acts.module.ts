import { NgModule, LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";

registerLocaleData(localeRu, "ru-ru");

import { ActsRoutingModule } from "./acts-routing.module";
import { SharedModule } from "../shared/shared.module";

import { ActsComponent } from "./acts.component";
import { ActsListComponent } from "./acts-list/acts-list.component";
import { ActDetailsComponent } from "./act-details/act-details.component";
import { ActFormComponent } from "./act-form/act-form.component";
import { FfInputComponent } from "../acts/act-form/ff-input/ff-input.component";
import { FfTextareaComponent } from "../acts/act-form/ff-textarea/ff-textarea.component";
import { FfDateComponent } from "../acts/act-form/ff-date-time/ff-date/ff-date.component";
import {
  StatusStepperComponent,
  CommentBottomSheet,
} from "./act-details/status-stepper/status-stepper.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { AddInputComponent } from "./act-form/add-input/add-input.component";
import { CustomersComponent } from "./acts-list/customers/customers.component";
import { GcustomersComponent } from "./acts-list/gcustomers/gcustomers.component";
import { DatingListComponent } from "./acts-list/dating-list/dating-list.component";
import { DatingYearsComponent } from "./acts-list/dating-list/dating-years/dating-years.component";
import { ActItemComponent } from "./acts-list/act-item/act-item.component";
import { ListItemsComponent } from "./acts-list/list-items/list-items.component";
import { DatePipe } from "@angular/common";
import { FfDateTimeComponent } from "./act-form/ff-date-time/ff-date-time.component";
import { FfTimeComponent } from "./act-form/ff-date-time/ff-time/ff-time.component";
import { EditActOptionsComponent } from "./act-form/edit-act-options/edit-act-options.component";
import { ActApplitcationComponent } from "./act-form/act-applitcation/act-applitcation.component";
import { ActsTableComponent } from "./acts-list/acts-table/acts-table.component";
import { DocsComponent } from "./act-details/docs/docs.component";

@NgModule({
  declarations: [
    ActsComponent,
    ActsListComponent,
    ActDetailsComponent,
    ActFormComponent,
    FfInputComponent,
    FfTextareaComponent,
    FfDateComponent,
    CommentBottomSheet,
    StatusStepperComponent,
    AddInputComponent,
    CustomersComponent,
    GcustomersComponent,
    DatingListComponent,
    DatingYearsComponent,
    ActItemComponent,
    ListItemsComponent,
    FfDateTimeComponent,
    FfTimeComponent,
    EditActOptionsComponent,
    ActApplitcationComponent,
    ActsTableComponent,
    DocsComponent,
  ],
  imports: [
    SharedModule,
    ActsRoutingModule,
    MatCheckboxModule,
    MatExpansionModule,
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: "ru-ru" }],
})
export class ActsModule {
}
