import { Component, OnInit, Input } from "@angular/core";
import { ActModel } from "src/app/shared/models/act.model";
import { StatusModel } from "src/app/shared/models/status.model";
import { GetCustomersWithActsQuery } from "src/types/generated";

@Component({
  selector: "app-act-item",
  templateUrl: "./act-item.component.html",
  styleUrls: ["./act-item.component.scss"],
})
export class ActItemComponent implements OnInit {
  @Input() acts: GetCustomersWithActsQuery["getCustomers"][0]["acts"];

  constructor() {}

  ngOnInit() {}

  getColor(status: StatusModel) {
    // if (status.production) return '#d9d9d9';
    // if (status.registration) return '#ff9933';
    // if (status.protocolCreated) return '#e6e600';
    // if (status.remarks) return '#cc0000';
    // if (status.noRemarks) return '#006600';
    // if (status.protocolUploaded) return "#00cc44";
  }
}
