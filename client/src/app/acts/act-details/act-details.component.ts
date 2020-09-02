import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { ActControlService } from "../../services/controls/act-control.service";

import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { switchMap, last } from "rxjs/operators";
import { ActModel } from "src/app/shared/models/act.model";
import { StatusModel } from "src/app/shared/models/status.model";
import { GetActForDetailsQuery } from "src/types/generated";
import { RulesControlService } from "src/app/services/controls/rules-control.service";
import { RulesService } from "src/app/services/data/rules.service";
import { TemplaterControlService } from "src/app/services/controls/templater-control.service";
import { FilesControlService } from "src/app/services/controls/files-control.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-act-details",
  templateUrl: "./act-details.component.html",
  styleUrls: ["./act-details.component.scss"],
})
export class ActDetailsComponent implements OnInit, OnDestroy {
  @ViewChild("fileInput") fileInput: any;

  private subscriptions$: Subscription = new Subscription();

  act: GetActForDetailsQuery["getAct"];
  status: StatusModel;
  errMess: string;
  actIds: string[];
  prev: string;
  next: string;
  getneratePath: string;

  confirmDelete: boolean;

  constructor(
    private acs: ActControlService,
    private route: ActivatedRoute,
    private location: Location,
    private rulesControlServic: RulesControlService,
    private readonly rulesService: RulesService,
    private readonly templaterControlService: TemplaterControlService,
    private readonly filesControlService: FilesControlService
  ) {}

  ngOnInit() {
    this.subscriptions$.add(
      this.acs.getActIds().subscribe((actIds) => (this.actIds = actIds))
    );
    this.subscriptions$.add(
      this.route.params
        .pipe(
          switchMap((params: Params) => this.acs.getActForDetails(params["id"]))
        )
        .subscribe(
          (act) => {
            this.act = act;
            this.setPrevNex(act.id);
            console.log(act);

            this.subscriptions$.add(
              this.rulesControlServic
                .getRuleLabTosTemplate(act.lab.id, act.typeOfSample.habitan.id)
                .subscribe(
                  (rule) => (this.getneratePath = rule ? rule.path : null)
                )
            );
          },
          (errmess) => (this.errMess = <any>errmess)
        )
    );
  }

  setPrevNex(actId: string) {
    const index = this.actIds.indexOf(actId);
    this.prev = this.actIds[
      (this.actIds.length + index - 1) % this.actIds.length
    ];
    this.next = this.actIds[
      (this.actIds.length + index + 1) % this.actIds.length
    ];
  }

  goBack(): void {
    this.location.back();
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

  onSubmit() {}

  deleteAct() {
    this.acs.deleteAct(this.act.id).subscribe(() => this.goBack());
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}
