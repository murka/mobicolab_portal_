import { InsertGeneralCustomerDto } from "../../models/dto/insert-gcustomer.dto";

export class UpdateGeneralCustomerCommand {
    constructor(public readonly data: InsertGeneralCustomerDto) {}
}