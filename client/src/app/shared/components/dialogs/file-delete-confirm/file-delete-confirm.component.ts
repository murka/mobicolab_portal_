import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from './dialog-data';

@Component({
  selector: "app-file-delete-confirm",
  templateUrl: "./file-delete-confirm.component.html",
  styleUrls: ["./file-delete-confirm.component.scss"],
})
export class FileDeleteConfirmComponent implements OnInit {
  confirmDelete: boolean = false;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<FileDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }

  onNoClick(): void {
    this.dialogRef.close((this.data.confirm = false));
  }

  confirmed(): void {
    this.dialogRef.close(this.data = { id: this.id, confirm: true });
  }
}
