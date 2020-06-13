import { GeneralCustomer } from "../../models/general-customer.model";

export class CeneralCustomerUpdatedEvent {
    constructor(public readonly gcustomer: GeneralCustomer) {}
}