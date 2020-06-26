import { Component, OnInit} from "@angular/core";
import { ActControlService } from "src/app/services/controls/act-control.service";
import { ActsService } from "../acts.service";
import { ActModel } from 'src/app/shared/models/act.model';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { StatusBaseModel } from 'src/app/shared/models/interface/status-base.model';
import { ActFormDataService } from 'src/app/services/data/act-form-data.service';

@Component({
  selector: "app-acts-list",
  templateUrl: "./acts-list.component.html",
  styleUrls: ["./acts-list.component.scss"]
})
export class ActsListComponent implements OnInit {
  acts: ActModel[];
  customers: CustomerModel[];
  _filteredActs: ActModel[];
  statuses: StatusBaseModel[];

  set toggleStatus(status: StatusBaseModel) {
    if (status) {
      this._filteredActs = this.filterActs(status.options.key);
    }
    if (!status) {
      this._filteredActs = this.acts;
    }
  }

  constructor(
    private acs: ActControlService,
    private as: ActsService,
    private afds: ActFormDataService,
  ) {
    this.statuses = this.as.getStatus();
  }

  ngOnInit() {
    this.acs.getActsForItem().subscribe(acts => {
      console.log(acts)
      this.acts = acts;
      this._filteredActs = acts;
    })
    this.afds
      .getActiveCustomer()
      .subscribe(customers => this.customers = customers) 
  }

  filterActs(stat: string): ActModel[] {
    return this.acts.filter(act => {
      if (act.status[stat] === true) {
        return act;
      }
    });
  }
}
