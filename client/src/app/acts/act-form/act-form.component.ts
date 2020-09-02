import { Component, OnInit, AfterContentInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActControlService } from "../../services/controls/act-control.service";
import { ActivatedRoute, Data } from "@angular/router";

import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { ActFormService } from "src/app/services/forms/act-form.service";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";
import { NewActDto } from "src/app/shared/models/dto/new-act.dto";
import { GetWholeActQuery } from "src/types/generated";
import { Subscription } from "rxjs";
import { UpdateActDto } from "src/app/shared/models/dto/update-act.dto";

const moment = _moment || _rollupMoment;

@Component({
  selector: "app-act-form",
  templateUrl: "./act-form.component.html",
  styleUrls: ["./act-form.component.scss"],
})
export class ActFormComponent implements OnInit, AfterContentInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();
  acts: Array<any>;
  act: GetWholeActQuery["getAct"];
  apps: any[];
  statusControl: boolean;
  dateTimeFields: any[];
  habitanFields: any;
  formAct: FormGroup;
  formControl: FormControl;
  _update: boolean;
  _copy: boolean;
  copyControl: boolean = false;

  constructor(
    private AFFS: ActFormFieldsService,
    private acs: ActControlService,
    private AFS: ActFormService,
    private activatedroute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.subscriptions$.add(
      this.activatedroute.data.subscribe((data: Data) => {
        console.log(data);

        if (data.update === true) {
          this.act = data["act"];
          this.statusControl = true;
        } else {
          this.act = data["act"];
          this.statusControl = false;
        }

        if (data.copy) {
          this.copyControl = true;
        }
      })
    );
  }

  ngOnInit() {
    this.acts = this.AFFS.getFields("act", "act");
    this.formAct = this.AFS.initForm("act", "act", this.act);
  }

  ngAfterContentInit() {
    this.formAct.get("place").valueChanges.forEach((value) => {
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
      this.subscriptions$.add(
        this.acs
          .patchAct(
            new UpdateActDto({ ...this.formAct.value, id: this.act.id })
          )
          .subscribe((act) => {
            this._snackBar.open(`Акт № ${act.name}`, "Обновлён Успешно", {
              duration: 2000,
            });
          })
      );
    } else {
      this.subscriptions$.add(
        this.acs.postAct(new NewActDto(this.formAct.value)).subscribe((act) => {
          this._snackBar.open(`Акт ${act.createAct.name}`, "Создан", {
            duration: 2000,
          });
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}
