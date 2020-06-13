import { CreateLabDto } from "../../models/dto/create-lab.dto";

export class CreateLabCommand {
    constructor(public readonly data: CreateLabDto) {
    }
}