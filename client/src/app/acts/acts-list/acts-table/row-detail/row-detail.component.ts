import { Component, Input, OnInit } from "@angular/core";
import { ActControlService } from "src/app/services/controls/act-control.service";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";
import { GetWholeActQuery } from "src/types/generated";

@Component({
  selector: "app-row-detail",
  templateUrl: "./row-detail.component.html",
  styleUrls: ["./row-detail.component.scss"],
})
export class RowDetailComponent implements OnInit {
  @Input() actId: string;

  act: GetWholeActQuery["getAct"];
  fields: any[];
  keys: string[];

  constructor(
    private readonly acs: ActControlService,
    private readonly affs: ActFormFieldsService
  ) {}

  ngOnInit(): void {
    this.acs.getAct(this.actId).subscribe((data) => {
      this.act = data;
      this.fields = this.affs.getFields("act", "act");
    });
  }
}
