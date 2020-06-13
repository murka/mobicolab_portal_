import { Customer } from "../../models/customer.model";

export class CustomerUpdatedEvent {
    constructor(public readonly customer: Customer) {}
}