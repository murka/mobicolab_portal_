import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActControlService } from "src/app/services/controls/act-control.service";
import { RulesControlService } from "src/app/services/controls/rules-control.service";
import { TemplaterControlService } from "src/app/services/controls/templater-control.service";
import { RulesService } from "src/app/services/data/rules.service";
import { ActFormFieldsService } from "src/app/services/forms/act-form-fields.service";
import { GetWholeActQuery } from "src/types/generated";
import { ContentItem } from "./models/content-items.model";
import { RowDetailService } from "./row-detail.service";

@Component({
  selector: "app-row-detail",
  templateUrl: "./row-detail.component.html",
  styleUrls: ["./row-detail.component.scss"],
})
export class RowDetailComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  @Input() actId: string;

  getneratePath: string;

  act: GetWholeActQuery["getAct"];
  fields: any[];
  keys: string[];
  content: ContentItem[];

  constructor(
    private readonly acs: ActControlService,
    private readonly affs: ActFormFieldsService,
    private readonly rds: RowDetailService,
    private readonly rulesControlService: RulesControlService,
    private readonly rulesService: RulesService,
    private readonly templaterControlService: TemplaterControlService
  ) {}

  ngOnInit(): void {
    this.subscriptions$.add(
      this.acs.getAct(this.actId).subscribe((data) => {
        this.act = data;
        this.fields = this.affs.getFields("act", "act");
        this.content = this.rds.getContent(this.act, this.fields);
        this.subscriptions$.add(
          this.rulesControlService
            .getRuleLabTosTemplate(data.lab.id, data.typeOfSample.habitan.id)
            .subscribe((rule) => (this.getneratePath = rule ? rule.path : null))
        );
      })
    );
  }

  choiseTemplate() {
    this.subscriptions$.add(
      this.rulesService
        .choiseTemplate(
          this.getneratePath ? true : false,
          this.act.lab.id,
          this.act.typeOfSample.habitan.id,
          true
        )
        .subscribe((path) => {
          console.log(path);

          this.getneratePath = path;
        })
    );
  }

  createPdf() {
    this.subscriptions$.add(
      this.templaterControlService
        .postNewPdf(this.act.id, this.getneratePath)
        .subscribe(() => console.log("generated Pdf"))
    );
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}
