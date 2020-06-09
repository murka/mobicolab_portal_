import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adding-item',
  templateUrl: './adding-item.component.html',
  styleUrls: ['./adding-item.component.scss']
})
export class AddingItemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddingItemComponent>) { }
  form: FormGroup;
  name: string;

  ngOnInit() {
    this.name = this.data.name;
    this.form = this.fb.group({
      value: ["", Validators.required]
    })
  }

  onSubmit() {
    this.dialogRef.close(this.form.value)
  }

}
