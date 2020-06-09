import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormArray, FormGroupName } from "@angular/forms";
import { OptionsBaseModel } from "src/app/shared/models/interface/options-base.model";
import { ActFormDataService } from "src/app/services/data/act-form-data.service";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { Observable } from "rxjs";
import { startWith, map, debounceTime, distinctUntilChanged, tap, filter } from "rxjs/operators";
import { ActFormControlService } from 'src/app/services/controls/act-form-control.service';

@Component({
  selector: "app-ff-autocomplete",
  templateUrl: "./ff-autocomplete.component.html",
  styleUrls: ["./ff-autocomplete.component.scss"]
})
export class FfAutocompleteComponent implements OnInit {
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
  get isValid() {
    return this.form.controls[this.key].valid;
  }

  auto: MatAutocomplete;
  optionsList: OptionsBaseModel[];
  _openControl: boolean = false;
  filteredOptions: Observable<OptionsBaseModel[]>;

  constructor(private AFDs: ActFormDataService, private AFCS: ActFormControlService) {}

  ngOnInit() {
    this.AFDs.getItemOptions(this.key).subscribe(options => {
      this.optionsList = options;
    });
    this.filteredOptions = this.form.controls[this.key].valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
    this.form.controls[this.key].valueChanges.pipe(
      debounceTime(3500),
      distinctUntilChanged(),
      filter(result => result !== '')
    ).subscribe(result => {
      this.AFCS.postActItem(this.key, {"label": result}).subscribe(item => {
        console.log(item);

        
        this.optionsList = [...this.optionsList, new OptionsBaseModel(item)];
        console.log(this.optionsList);
        
      })
    })
  }

  // addItem(): void {
  //   this.AFDs.addItemOptions(this.key, this.label).subscribe(item => {
  //     if (item) {
  //       this.optionsList = [...this.optionsList, item];
  //       this.form.controls[this.key].patchValue(
  //         !this.populate ? item.value : item.key
  //       );
  //     }
  //   });
  // }

  editOpen(id: string): void {
    this._openControl = true;
    this.AFDs.editItemOptions(this.key, this.label, id).subscribe(item => {
      if (item) {
        this.optionsList = [
          ...this.optionsList.filter(option => option.key !== id),
          item
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
      ...this.optionsList.filter(option => option.key !== id)
    ];
  }

  buttonCondition(condition: boolean, opt: OptionsBaseModel): void {
    this.optionsList.find(option => {
      if (option.key === opt.key) return option;
    }).buttonController = condition;
  }

  private _filter(value: string): OptionsBaseModel[] {
    const filteredValue = value.toLowerCase();

    return this.optionsList.filter(option => option.value !== undefined).filter(option =>
      option.value.toLowerCase().includes(filteredValue)
    );
  }

  // _open() {
  //   if (this._openControl) {
  //     this._select.open();
  //   }
  // }
}
