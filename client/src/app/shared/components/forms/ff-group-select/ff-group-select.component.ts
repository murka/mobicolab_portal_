import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { FormGroup, FormControlName } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { OptionGroupBaseModel } from "src/app/shared/models/interface/option-group-base.model";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";
import { ActFormDataService } from "src/app/services/data/act-form-data.service";
import { ActFormService } from "src/app/services/forms/act-form.service";
import { ActModel } from 'src/app/shared/models/act.model';

@Component({
  selector: "app-ff-group-select",
  templateUrl: "./ff-group-select.component.html",
  styleUrls: ["./ff-group-select.component.scss"]
})
export class FfGroupSelectComponent implements OnInit, AfterViewInit {
  @ViewChild("select", { static: false }) select: MatSelect;
  @Input() label: string;
  @Input() key: string;
  @Input() controll: FormControlName;
  @Input() form: FormGroup;
  @Input() item: ActModel;
  get isValid() {
    return this.form.controls[this.key].valid;
  }
  addForm: FormGroup;
  fields: any[];
  options: OptionGroupBaseModel[];
  _selectedControll: boolean = false;
  _button: boolean = false;
  _openControl: boolean = false;

  constructor(
    private AFS: ActFormService,
    private AFFS: ActFormFieldsService,
    private AFDS: ActFormDataService
  ) {}

  ngOnInit() {
    this.addForm = this.AFS.initForm(this.key, "act", this.item? this.item.typeOfSample : null);
    this.form.setControl(this.key, this.addForm);
    this.fields = this.AFFS.getFields(this.key, "act");
    this.AFDS.getItemOptionsOfGroup(this.key).subscribe(options => {
      this.options = options;
    });
  }

  addGroup(): void {
    this._openControl = true;
    this.select.open();
    this.AFDS.addItemGroupOptions(this.key, this.label).subscribe(item => {
      this.options = [...this.options, item];
      this._openControl = false;
    });
  }

  editGroup(group) {
    this._openControl = true;
    this.AFDS.editItemGroupOtopns(
      this.key,
      this.label,
      group.key,
      group
    ).subscribe(item => {
      this.options = [
        ...this.options.filter(option => option.key !== item.key),
        item
      ];
      this._openControl = false;
    });
  }

  addItem(id: string): void {
    this._openControl = true;
    this.select.open()
    this.AFDS.addItemGroupOptions(
      this.key,
      this.label,
      id,
      "Тип Отбтраемой Пробы"
    ).subscribe(item => {
      this.options = [
        ...this.options.filter(option => option.key !== item.key),
        item
      ];
      this._openControl = false;
    });
  }

  editItem(group, id: string, tp: string) {
    this._openControl = true;
    this.AFDS.editItemGroupOtopns(
      this.key,
      this.label,
      id,
      group,
      tp,
      "Тип Отбтраемой Пробы"
    ).subscribe(item => {
      this.options = [
        ...this.options.filter(option => option.key !== item.key),
        item
      ];
      this._openControl = false;
    });
  }

  deleteItem(group: OptionGroupBaseModel, id: string, tp: string) {
    this._openControl = true;
    this.AFDS.deleteItemGroupOption(this.key, id, group, tp).subscribe(item => {
      this.options = [
        ...this.options.filter(option => option.key !== item.key),
        item
      ];
      this._openControl = false;
    })
  }

  _open() {
    if (this._openControl) {
      this.select.open();
    }
  }

  ngAfterViewInit() {
    this.select.optionSelectionChanges.subscribe(stream => {
      this.form
        .get("typeOfSample")
        .get("habitan")
        .patchValue(stream.source.group.label);
    });
    
    // // here we disabled/enebled groups if one of them choised

    // this.select.optionSelectionChanges.subscribe(res => {
    //   if (res.source.selected) {
    //     if (!this._selectedControll) {
    //       this._selectedControll = true;
    //       let grpId = res.source.group.label;
    //       this.select.optionGroups.forEach(grp => {
    //         if (grp.label !== grpId) {
    //           grp.disabled = true;
    //         }
    //       });
    //     }
    //   } else {
    //     this._selectedControll = false;
    //     this.select.optionGroups.forEach(grp => (grp.disabled = false));
    //   }
    // });
  }
}
