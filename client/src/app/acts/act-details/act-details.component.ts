import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActControlService } from "../../services/controls/act-control.service";

import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { switchMap } from "rxjs/operators";
import { ActModel } from "src/app/shared/models/act.model";
import { StatusModel } from "src/app/shared/models/status.model";

@Component({
  selector: "app-act-details",
  templateUrl: "./act-details.component.html",
  styleUrls: ["./act-details.component.scss"],
})
export class ActDetailsComponent implements OnInit {
  @ViewChild("fileInput") fileInput: any;

  act: ActModel;
  status: StatusModel;
  errMess: string;
  actIds: string[];
  prev: string;
  next: string;

  confirmDelete: boolean

  constructor(
    private acs: ActControlService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.acs.getActIds().subscribe((actIds) => (this.actIds = actIds));
    this.route.params
      .pipe(switchMap((params: Params) => this.acs.getAct(params["id"])))
      .subscribe(
        (act) => {
          this.act = act;
          this.status = this.act.status;
          this.setPrevNex(act._id);
        },
        (errmess) => (this.errMess = <any>errmess)
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

  onSubmit() {}

  deleteAct() {
    this.acs.deleteAct(this.act._id).subscribe(() => this.goBack());
  }
}
