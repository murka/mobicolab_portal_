import { Component, OnInit, Input } from "@angular/core";
import { GeneralCustomerControlService } from "src/app/services/controls/general-custromer-control.service";
import { ActModel } from "src/app/shared/models/act.model";
import { GCustomerModel } from "src/app/shared/models/gcustomer.model";
import { CustomerModel } from "src/app/shared/models/customer.model";
import { GetCustomersWithActsQuery } from "src/types/generated";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  @Input() customers: GetCustomersWithActsQuery;
  //   @Input() set acts(acts: ActModel[]) {
  //     this._actsController = acts;
  //   }

  //   filteredActsByCustomer: ActModel[] = [];
  //   _actsController: ActModel[];

  constructor() {}

  ngOnInit() {
    console.log(this.customers);
  }
}
