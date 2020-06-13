import { Customer } from "../../models/customer.model";

export class CustomerCreatedEvent {
  constructor(public readonly customer: Customer) {}
}
