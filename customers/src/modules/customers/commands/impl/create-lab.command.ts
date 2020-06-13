import { CreateCustomerDto } from "../../models/dto/create-customer.dto";

export class CreateCustomerCommand {
    constructor(public readonly data: CreateCustomerDto) {
    }
}