import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActFormDataService } from "src/app/services/data/act-form-data.service";
import { OptionsBaseModel } from "src/app/shared/models/interface/options-base.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TemplatePreviewControlService } from "src/app/services/controls/template-preview-control.service";
import { Template } from "src/app/shared/protos/template-preview_pb";

@Component({
  selector: "app-templates",
  templateUrl: "./templates.component.html",
  styleUrls: ["./templates.component.scss"],
})
export class TemplatesComponent implements OnInit {
  mobicolabRadio: string;

  templateList: Template.AsObject[];

  form: FormGroup;
  labs: OptionsBaseModel[];

  constructor(
    public dialogRef: MatDialogRef<TemplatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private AFDs: ActFormDataService,
    private fb: FormBuilder,
    private tpcs: TemplatePreviewControlService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.initForm();
    this.AFDs.getItemOptions("lab").subscribe((option) => {
      this.labs = option;
      console.log(this.labs);
    });

    this.templateList = (await this.tpcs.getAllTemplates()).templatesList;

    console.log(this.templateList);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(): FormGroup {
    return this.fb.group({
      lab: ["", Validators.required],
      typeOfSample: ["", Validators.required],
      path: [""],
    });
  }

  onSubmit() {}

  radioChange(event) {
    this.form.controls["path"].reset(event.value);
  }
}
