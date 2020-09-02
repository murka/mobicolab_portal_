import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { OptionsEditDataModel } from "./data.model";
import { AddressModel } from "src/app/shared/models/address.model";
import { ActFormService } from "src/app/services/forms/act-form.service";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";
import { CustomerModel } from "src/app/shared/models/customer.model";
import { GCustomerModel } from "src/app/shared/models/gcustomer.model";
import { LabModel } from "src/app/shared/models/lab.model";
import { generalOptionModel } from "src/app/shared/models/generalOptions.model";

@Component({
  selector: "app-edit-act-options",
  templateUrl: "./edit-act-options.component.html",
  styleUrls: ["./edit-act-options.component.scss"],
})
export class EditActOptionsComponent implements OnInit {
  form: FormGroup;
  fields: any[];
  address: AddressModel;

  constructor(
    private AFS: ActFormService,
    private AFFS: ActFormFieldsService,
    @Inject(MAT_DIALOG_DATA) public data: OptionsEditDataModel,
    public dialogRef: MatDialogRef<EditActOptionsComponent>
  ) {
    if (data.item) {
      this.address = (<
        CustomerModel | GCustomerModel | LabModel | generalOptionModel
      >data.item).address;
    }
  }

  ngOnInit(): void {
    this.fields = this.AFFS.getFields(this.data.key, "editOptions");
    this.form = this.AFS.initForm(this.data.key, "editOptions", this.data.item);
  }

  close(): void {
    this.dialogRef.close(undefined);
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }
}
