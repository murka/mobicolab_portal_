import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, FormArray, FormGroupName } from "@angular/forms";
import { OptionsBaseModel } from "src/app/shared/models/interface/options-base.model";
import { MatSelect } from "@angular/material/select";
import { ActFormDataService } from "src/app/services/data/act-form-data.service";

@Component({
  selector: "app-ff-select",
  templateUrl: "./ff-select.component.html",
  styleUrls: ["./ff-select.component.scss"],
})
export class FfSelectComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() control: string;
  @Input() populate: boolean;
  @Input() editable: boolean;
  @Input() deletable: boolean;
  @Input() arrName: FormArray;
  @Input() app: boolean;
  @Input() fgn: FormGroupName;
  @Input() disabledControl: boolean = false;
  get isValid() {
    return this.form.controls[this.key].valid;
  }
  @ViewChild("select") _select: MatSelect;

  optionsList: OptionsBaseModel[];
  _openControl: boolean = false;

  constructor(private AFDs: ActFormDataService) {}

  ngOnInit() {
    this.AFDs.getItemOptions(this.key).subscribe((options) => {
      this.optionsList = options;
    });
  }

  addItem(): void {
    this.AFDs.addItemOptions(this.key, this.label).subscribe((item) => {
      if (item) {
        this.optionsList = [...this.optionsList, item];
        this.form.controls[this.key].patchValue(
          !this.populate ? item.value : item.key
        );
      }
    });
  }

  editOpen(id: string): void {
    this._openControl = true;
    this.AFDs.editItemOptions(this.key, this.label, id).subscribe((item) => {
      if (item) {
        this.optionsList = [
          ...this.optionsList.filter((option) => option.key !== id),
          item,
        ];
        this.form.controls[this.key].patchValue(
          !this.populate ? item.value : item.key
        );
      }
    });
  }

  deleteItem(id: string): void {
    this._openControl = false;
    this.AFDs.deleteItemOptions(this.key, id);
    this.optionsList = [
      ...this.optionsList.filter((option) => option.key !== id),
    ];
  }

  buttonCondition(condition: boolean, opt: OptionsBaseModel): void {
    this.optionsList.find((option) => {
      if (option.key === opt.key) return option;
    }).buttonController = condition;
  }

  _open() {
    if (this._openControl) {
      this._select.open();
    }
  }
}
