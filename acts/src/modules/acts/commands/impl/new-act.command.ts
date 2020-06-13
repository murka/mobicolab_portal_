import { NewActDto } from "../../models/dto/new-act.dto";

export class NewActCommand {
    constructor(public readonly newActData: NewActDto) {}
}