import { AddActDto } from "../../models/dto/add-act.dto";

export class AddActCommand {
    constructor(public readonly data: AddActDto) {}
}