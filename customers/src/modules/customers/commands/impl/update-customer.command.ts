import { PatchCustomerDto } from "../../models/dto/patch-customer.dto";

export class UpdateCustomerCommand {
    constructor(public readonly data: PatchCustomerDto) {}
}