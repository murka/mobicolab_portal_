import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { OptionsBaseModel } from "src/app/shared/models/interface/options-base.model";
import { MatSelect } from "@angular/material/select";
import { ActFormDataService } from 'src/app/services/data/act-form-data.service';

@Component({
  selector: "app-ff-many-select",
  templateUrl: "./ff-many-select.component.html",
  styleUrls: ["./ff-many-select.component.scss"]
})
export class FfManySelectComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() populate: boolean;
  @Input() editable: boolean;
  @Input() deletable: boolean;
  get isValid() {
    return this.form.controls[this.key].valid;
  }
  @ViewChild("select") _select: MatSelect;

  optionsList: OptionsBaseModel[];
  _openControl: boolean = false;

  constructor(private AFDs: ActFormDataService) {}

  ngOnInit(): void {
    this.AFDs.getItemOptions(this.key).subscribe(options => {
      this.optionsList = options;
    });
  }

  addItem(): void {
    this.AFDs.addItemOptions(this.key, this.label).subscribe(item => {
      if (item) {
        this.optionsList = [...this.optionsList, item];
        this.form.controls[this.key].patchValue([...this.form.controls[this.key].value, item.value])
      }
    })
  }

  editOpen(id: string) {
    this._openControl = false;
    this.AFDs.editItemOptions(this.key, this.label, id).subscribe(item => {
      if (item) {
        this.optionsList = [...this.optionsList.filter(option => option.key !== id), item]
        this.form.controls[this.key].patchValue([...this.form.controls[this.key].value, item.value])
      }
    })
  }

  deleteOpen(id: string): void {
    this._openControl = false;
    this.AFDs.deleteItemOptions(this.key, id);
    this.optionsList = [...this.optionsList.filter(option => option.key !== id)];
  }

  buttonCondition(condition: boolean, opt: OptionsBaseModel): void {
    this.optionsList.find(option => {
      if (option.key === opt.key) return option;
    }).buttonController = condition;
  }

  _diselect() {
    if (this._openControl) {
      this._openControl = false;
      let v: Array<any> = this.form.controls[this.key].value;
      this.form.controls[this.key].patchValue(v.slice(0, -2));
    }
  }
}
