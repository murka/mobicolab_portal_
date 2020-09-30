import { Component, Input, OnInit } from "@angular/core";
import { ActControlService } from "src/app/services/controls/act-control.service";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";
import { GetWholeActQuery } from "src/types/generated";
import { ContentItem } from './models/content-items.model';
import { RowDetailService } from './row-detail.service';

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
  content: ContentItem[]

  constructor(
    private readonly acs: ActControlService,
    private readonly affs: ActFormFieldsService,
    private readonly rds: RowDetailService,
  ) {}

  ngOnInit(): void {
    this.acs.getAct(this.actId).subscribe((data) => {
      this.act = data;
      this.fields = this.affs.getFields("act", "act");
      this.content = this.rds.getContent(this.act, this.fields)
    });
  }
}
