import { Component, OnInit, Input } from "@angular/core";
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { GCustomerModel } from 'src/app/shared/models/gcustomer.model';
import { ActModel } from 'src/app/shared/models/act.model';


@Component({
  selector: "app-gcustomers",
  templateUrl: "./gcustomers.component.html",
  styleUrls: ["./gcustomers.component.scss"]
})
export class GcustomersComponent implements OnInit {
  @Input() customer: CustomerModel;
  @Input() gcustomers: GCustomerModel[];
  @Input() set acts(acts: ActModel[]) {
    this._actController = acts;
    if (this.customer) {
      this.filteredActsByCustomer = this.filterActsByCustomer(acts, this.customer);
      this.filterGCustomerByActs(this.filteredActsByCustomer, this.gcustomers);
    }
  }
  get acts(): ActModel[] {
    return this._actController;
  }

  filteredGCustomersByActs: GCustomerModel[];
  filteredActsByCustomer: ActModel[];
  _actController: ActModel[];

  constructor() {
  }

  ngOnInit() {
    this.filteredActsByCustomer = this.filterActsByCustomer(this.acts, this.customer)
    this.filterGCustomerByActs(this.filteredActsByCustomer, this.gcustomers);
  }

  filterGCustomerByActs(acts: ActModel[], gcustomers: GCustomerModel[]): void {
    let GCIds: string[] = acts.map(act => {
      return act.generalCustomer;
    });
    this.filteredGCustomersByActs = gcustomers.filter(customer =>
      GCIds.includes(customer._id)
    );  
  }

  filterActsByCustomer(acts: ActModel[], customer: CustomerModel): ActModel[] {
    const filteredActsByCustomer = [];
    acts.forEach(act => {
      const index = customer.acts.findIndex(cs => cs === act._id);
      if (index !== -1) {
        filteredActsByCustomer.push(act);
      }
    });
    
    return filteredActsByCustomer;
  }

}
