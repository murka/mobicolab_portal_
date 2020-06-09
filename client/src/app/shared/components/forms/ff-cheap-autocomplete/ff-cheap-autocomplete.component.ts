import { ENTER } from "@angular/cdk/keycodes";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import { OptionsBaseModel } from "src/app/shared/models/interface/options-base.model";
import { Observable, observable } from "rxjs";
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { ActFormDataService } from "src/app/services/data/act-form-data.service";
import { ActFormControlService } from "src/app/services/controls/act-form-control.service";
import {
  MatChipInputEvent,
  MatChipEvent,
  MatChipList
} from "@angular/material/chips";
import { generalOptionModel } from "src/app/shared/models/generalOptions.model";

@Component({
  selector: "app-ff-cheap-autocomplete",
  templateUrl: "./ff-cheap-autocomplete.component.html",
  styleUrls: ["./ff-cheap-autocomplete.component.scss"]
})
export class FfCheapAutocompleteComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() control: string;
  @Input() populate: boolean;
  @Input() editable: boolean;
  @Input() deletable: boolean;
  get isValid() {
    return this.form.controls[this.key].valid;
  }

  @ViewChild("auto") matAtocomplete: MatAutocomplete;
  @ViewChild("itemInput") itemInput: ElementRef<HTMLInputElement>;
  @ViewChild("chipList") chipList: MatChipList;

  list: MatChipList;

  separatorKeysCodes: number[] = [ENTER];
  visible = true;
  selectable = true;
  removable = true;
  optionsList: OptionsBaseModel[];
  _openControl: boolean = false;
  filteredOptions: Observable<OptionsBaseModel[]>;
  items: string[] = [];
  inputForm = new FormControl();

  constructor(
    private AFDs: ActFormDataService,
    private AFCs: ActFormControlService
  ) {}

  ngOnInit() {
    let options: string[] = this.form.controls[this.key].value;
    this.items = (options.length > 0)? options : [];
    this.AFDs.getItemOptions(this.key).subscribe(options => {
      this.optionsList = options;
    });
    this.filteredOptions = this.inputForm.valueChanges.pipe(
      startWith(""),
      map((option: string | null) =>
        option ? this._filter(option) : this.optionsList.slice()
      )
    );
    // this.form.controls[this.key].valueChanges.pipe(
    //   debounceTime(3500),
    //   distinctUntilChanged(),
    //   filter(result => result !== '')
    // ).subscribe(result => {
    //   this.AFCS.postActItem(this.key, {"label": result}).subscribe(item => {
    //     console.log(item);

    //     this.optionsList = [...this.optionsList, new OptionsBaseModel(item)];
    //     console.log(this.optionsList);

    //   })
    // })
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

  editOpen(item): void {
    console.log(item);
    let index = this.optionsList.find(op => op.value === item).key;
    this.AFDs.editItemOptions(this.key, this.label, index).subscribe(item => {
      if (item) {
        this.optionsList = [
          ...this.optionsList.filter(option => option.key !== item.key),
          item
        ];
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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    //let slice string if it have commas

    if (value.trim().includes(",")) {
      value.split(",").forEach(val => {
        if ((val || "").trim()) {
          if (!this.items.includes((val).trim())) {
            this.items.push(val.trim());
            if (!this.optionsList.map(option => option.value).includes(val)) {
              this.AFCs.postActItem(
                this.key,
                new generalOptionModel({ label: val })
              ).subscribe(item => {
                console.log('it works', item);
                
                this.optionsList = [...this.optionsList, new OptionsBaseModel(item)];
              });
            }
          }
        }
      });
    } else {
      //Add our item
      if ((value || "").trim()) {
        if (!this.items.includes(value)) {
          this.items.push(value.trim());
          if (!this.optionsList.map(option => option.value).includes(value)) {
            this.AFCs.postActItem(
              this.key,
              new generalOptionModel({ label: value })
            ).subscribe(item => {
              this.optionsList = [...this.optionsList, new OptionsBaseModel(item)];
            });
          }
        }
      }
    }

    //reset the input value
    if (input) {
      input.value = "";
    }
    this.inputForm.setValue(null);
    this.form.controls[this.key].patchValue(this.items);
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }

    this.form.controls[this.key].patchValue(this.items);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    this.itemInput.nativeElement.value = "";
    this.inputForm.setValue(null);
    this.form.controls[this.key].patchValue(this.items);
  }

  private _filter(value: string): OptionsBaseModel[] {
    const filteredValue = value.toLowerCase();
    return this.optionsList
      .filter(option => option.value !== undefined)
      .filter(
        option => option.value.toLowerCase().indexOf(filteredValue) === 0
      );
  }
}
