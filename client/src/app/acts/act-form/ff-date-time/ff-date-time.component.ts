import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormGroupName } from "@angular/forms";
import { ActFormService } from "src/app/services/forms/act-form.service";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";

@Component({
  selector: "app-ff-date-time",
  templateUrl: "./ff-date-time.component.html",
  styleUrls: ["./ff-date-time.component.scss"]
})
export class FfDateTimeComponent implements OnInit {
  @Input() controll: string;
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() item: any;

  fields: any[];
  newControl: FormGroup;

  constructor(
    private AFS: ActFormService,
    private AFFS: ActFormFieldsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fields = this.AFFS.getFields(this.key, "act");
    this.newControl = this.AFS.initForm(
      this.key,
      "act",
      this.item ? this.item : null
    );
    this.form.setControl(this.key, this.newControl);
  }
}
