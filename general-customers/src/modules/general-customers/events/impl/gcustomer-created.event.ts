import { GeneralCustomer } from "../../models/general-customer.model";

export class GeneralCustomerCreatedEvent {
  constructor(public readonly gcustomer: GeneralCustomer) {}
}
