import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
  NativeDateAdapter,
} from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateModule,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FileUploadModule } from "ng2-file-upload";
import { Md2Module, NoConflictStyleCompatibilityMode } from "angular-md2";
import { PdfViewerModule } from "ng2-pdf-viewer";

import { AutocompleteComponent } from "./components/autocomplete/autocomplete.component";
import { AddingItemComponent } from "./adding-item/adding-item.component";
import { LookUpDirective } from "./directives/look-up.directive";
import { AddressComponent } from "./components/address/address.component";
import { FfSelectComponent } from "./components/forms/ff-select/ff-select.component";
import { EditButtonComponent } from "./components/buttons/edit-button.component";
import { DeleteButtonComponent } from "./components/buttons/delete-button.component";
import { ClearButtonComponent } from "./components/buttons/clear-button.component";
import { FfManySelectComponent } from "./components/forms/ff-many-select/ff-many-select.component";
import { FfGroupSelectComponent } from "./components/forms/ff-group-select/ff-group-select.component";
import { FfAutocompleteComponent } from "./components/forms/ff-autocomplete/ff-autocomplete.component";
import { FfCheapAutocompleteComponent } from "./components/forms/ff-cheap-autocomplete/ff-cheap-autocomplete.component";
import { FileDeleteConfirmComponent } from "./components/dialogs/file-delete-confirm/file-delete-confirm.component";
import { TemplatesComponent } from "./components/dialogs/templates/templates.component";
import { PdfViewComponent } from "./components/dialogs/templates/pdf-view/pdf-view.component";

@NgModule({
  declarations: [
    AutocompleteComponent,
    AddingItemComponent,
    LookUpDirective,
    AddressComponent,
    FfSelectComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    ClearButtonComponent,
    FfManySelectComponent,
    FfGroupSelectComponent,
    FfAutocompleteComponent,
    FfCheapAutocompleteComponent,
    FileDeleteConfirmComponent,
    TemplatesComponent,
    PdfViewComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule,
    MatRadioModule,
    PdfViewerModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MomentDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteComponent,
    FileUploadModule,
    Md2Module,
    NoConflictStyleCompatibilityMode,
    LookUpDirective,
    AddressComponent,
    FfSelectComponent,
    FfManySelectComponent,
    FfGroupSelectComponent,
    ClearButtonComponent,
    FfAutocompleteComponent,
    FfCheapAutocompleteComponent,
    TemplatesComponent,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MAT_DATE_LOCALE, useValue: "ru-RU" },
    // { provide: DateAdapter, useClass: NativeDateAdapter},
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ["L"],
        },
        display: {
          dateInput: "LL",
          timeInput: "LT",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LLL",
          monthYearA11yLabel: "MMMM YYYY",
        },
      },
    },
  ],
})
export class SharedModule {}
