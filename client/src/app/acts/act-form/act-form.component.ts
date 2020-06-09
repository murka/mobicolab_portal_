import { Component, OnInit, AfterContentInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActControlService } from "../../services/controls/act-control.service";
import { ActivatedRoute, Data } from "@angular/router";

import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { ActModel } from "src/app/shared/models/act.model";
import { ActFormService } from "src/app/services/forms/act-form.service";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";

const moment = _moment || _rollupMoment;

@Component({
  selector: "app-act-form",
  templateUrl: "./act-form.component.html",
  styleUrls: ["./act-form.component.scss"]
})
export class ActFormComponent implements OnInit, AfterContentInit {
  acts: Array<any>;
  apps: any[];
  statusControl: boolean;
  act: ActModel;
  dateTimeFields: any[];
  habitanFields: any;
  formAct: FormGroup;
  formControl: FormControl;
  _update: boolean;
  _copy: boolean;

  constructor(
    private AFFS: ActFormFieldsService,
    private acs: ActControlService,
    private AFS: ActFormService,
    private activatedroute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.activatedroute.data.subscribe((data: Data) => {
      if (data.update === true) {
        this.act = data["act"];
        this.statusControl = true;
      } else {
        this.act = data['act'];
        this.statusControl = false;
      }
    });
  }

  ngOnInit() {
    this.acts = this.AFFS.getFields("act", "act");
    this.formAct = this.AFS.initForm("act", "act", this.act);
  }

  ngAfterContentInit() {
    this.formAct.get("place").valueChanges.forEach(value => {
      if (
        value === "Приложение" ||
        value === "см. Приложение" ||
        value === "см.Приложение"
      ) {
        this.formAct.get("datetime").disable();
      } else {
        this.formAct.get("datetime").enable();
      }
    });
  }


  onSubmit() {
    if (this.statusControl) {
      this.acs.patchAct(this.act._id, this.formAct.value).subscribe(act => {
        this.act = <ActModel>act;
        console.log(this.act);
        
        this._snackBar.open(`Акт № ${this.act.name}`, "Обновлён Успешно", {
          duration: 2000
        });
      });
      console.log(this.formAct.value);
      
    } else {
      this.acs.postAct(this.formAct.value).subscribe(act => {
        console.log("postact", act);
        this.act = <ActModel>act;
        this._snackBar.open(`Акт ${this.act.name}`, "Создан", {
          duration: 2000
        });
      });
    }
  }
}
