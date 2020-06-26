import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActFormDataService } from 'src/app/services/data/act-form-data.service';
import { OptionsBaseModel } from 'src/app/shared/models/interface/options-base.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  form: FormGroup
  labs: OptionsBaseModel[]

  constructor(
    public dialogRef: MatDialogRef<TemplatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private AFDs: ActFormDataService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
    this.AFDs.getItemOptions('lab').subscribe(option => {
      this.labs = option
      console.log(this.labs);
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  initForm(): FormGroup {
    return this.fb.group({
      lab: ['', Validators.required],
      typeOfSample: ['', Validators.required]
    })
  }

  onSubmit() {}

}
