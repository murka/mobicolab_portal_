import { Component, OnInit, Input } from '@angular/core';
import { GeneralCustomerControlService } from 'src/app/services/controls/general-custromer-control.service';
import { ActModel } from 'src/app/shared/models/act.model';
import { GCustomerModel } from 'src/app/shared/models/gcustomer.model';
import { CustomerModel } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @Input() customers: CustomerModel[];
  @Input() set acts(acts: ActModel[]) {
    this._actsController = acts;
  }

  gcustomers: GCustomerModel[];
  filteredActsByCustomer: ActModel[] = [];
  _actsController: ActModel[];


  constructor(private GCCS: GeneralCustomerControlService) { }

  ngOnInit() {
    this.GCCS.getGCustomers().subscribe(gc => {
      this.gcustomers = gc;
      console.log('gcustomers in customers', this.gcustomers);
      
    });
  }

}