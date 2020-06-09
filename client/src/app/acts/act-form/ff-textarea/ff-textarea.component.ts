import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ff-textarea',
  templateUrl: './ff-textarea.component.html',
  styleUrls: ['./ff-textarea.component.scss']
})
export class FfTextareaComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.key].valid; }

  constructor() { }

  ngOnInit() {
  }

}
