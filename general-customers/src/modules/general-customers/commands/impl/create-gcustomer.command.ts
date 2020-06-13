import { CreateGeneralCustomerDto } from "../../models/dto/create-gcustomer.dto";

export class CreateGeneralCustomerCommand {
    constructor(public readonly data: CreateGeneralCustomerDto) {
    }
}