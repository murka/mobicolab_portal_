import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActFormDataService } from "src/app/services/data/act-form-data.service";
import { OptionsBaseModel } from "src/app/shared/models/interface/options-base.model";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { TemplatePreviewControlService } from "src/app/services/controls/template-preview-control.service";
import { Template } from "src/app/shared/protos/template-preview_pb";
import { RulesControlService } from "src/app/services/controls/rules-control.service";

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
    @Inject(MAT_DIALOG_DATA)
    public data: { labId: string; typeId: string; update: boolean },
    private AFDs: ActFormDataService,
    private fb: FormBuilder,
    private tpcs: TemplatePreviewControlService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.initForm();
    this.AFDs.getItemOptions("lab").subscribe((option) => {
      this.labs = option;
    });

    this.templateList = (await this.tpcs.getAllTemplates()).templatesList;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(): FormGroup {
    return new FormGroup({
      lab: new FormControl(
        {
          value: this.data.labId ? this.data.labId : "",
          disabled: this.data.labId ? true : false,
        },
        Validators.required
      ),
      typeOfSample: new FormControl({
        value: this.data.typeId ? this.data.typeId : "",
        disabled: this.data.typeId ? true : false,
      }),
      path: new FormControl("", Validators.required),
    });
  }

  close(): void {
    this.dialogRef.close(undefined);
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  radioChange(event) {
    this.form.controls["path"].reset(event.value);
  }
}
