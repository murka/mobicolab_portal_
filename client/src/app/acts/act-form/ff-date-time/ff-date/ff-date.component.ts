import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormControlName, FormGroupName } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-ff-date",
  templateUrl: "./ff-date.component.html",
  styleUrls: ["./ff-date.component.scss"]
})
export class FfDateComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;
  @Input() controll: string;
  @Input() form: FormGroup;


  get isValid() {
    return this.form.controls[this.controll][this.key].valid;
  }

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
  }

}
