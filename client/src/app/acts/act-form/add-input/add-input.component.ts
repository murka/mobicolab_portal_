import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-input',
  templateUrl: './add-input.component.html',
  styleUrls: ['./add-input.component.scss']
})
export class AddInputComponent implements OnInit {
  @Input() label: string;
  @Input() key: string;

  constructor() { }

  ngOnInit() {
  }

}
