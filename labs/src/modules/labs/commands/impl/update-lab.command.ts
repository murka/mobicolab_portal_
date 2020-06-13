import { InsertLabDto } from "../../models/dto/insert-lab.dto";

export class UpdateLabCommand {
    constructor(public readonly data: InsertLabDto) {}
}