import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import {
  FormArray,
  FormGroup,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { ActFormService } from "src/app/services/forms/act-form.service";
import { ActModel } from "src/app/shared/models/act.model";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";

@Component({
  selector: "app-act-applitcation",
  templateUrl: "./act-applitcation.component.html",
  styleUrls: ["./act-applitcation.component.scss"]
})
export class ActApplitcationComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() item: ActModel;

  fa: FormArray;
  fields: any[];
  _control: FormArray;
  controls: AbstractControl[];

  constructor(
    private AFS: ActFormService,
    private AFFS: ActFormFieldsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fields = this.AFFS.getFields("application", "act");
    this.fa = this.AFS.initArray("application", this.item? this.item.application : null);
    this.form.setControl("application", this.fa);
    this.controls = (<FormArray>this.form.controls["application"]).controls;
  }

  addField(): void {
    (<FormArray>this.form.controls["application"]).push(
      this.AFS.initForm("application", "act")
    );
    this.cdr.detectChanges();
  }

  deleteField(index: number) {
    if (this.controls.length < 2) {
      (<FormArray>this.form.controls["application"]).reset();
    } else {
      (<FormArray>this.form.controls["application"]).removeAt(index);
    }
  }
}
