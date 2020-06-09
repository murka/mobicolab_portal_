import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ff-input',
  templateUrl: './ff-input.component.html',
  styleUrls: ['./ff-input.component.scss']
})
export class FfInputComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.key].valid; }

  constructor() { }

  ngOnInit() {
  }

}
