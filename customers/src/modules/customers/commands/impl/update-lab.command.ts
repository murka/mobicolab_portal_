import { InsertCustomerDto } from "../../models/dto/insert-customer.dto";

export class UpdateCustomerCommand {
    constructor(public readonly data: InsertCustomerDto) {}
}