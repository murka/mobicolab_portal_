import { Component, OnInit, Input } from '@angular/core';
import { FormControlName, FormGroupName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ff-time',
  templateUrl: './ff-time.component.html',
  styleUrls: ['./ff-time.component.scss']
})
export class FfTimeComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;
  @Input() controll: string;
  @Input() form: FormGroup;


  get isValid() {
    return this.form.controls[this.controll][this.key].valid;
  }

  constructor() {}

  ngOnInit() {
  }
}
