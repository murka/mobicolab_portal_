import { PatchActDto } from "../../models/dto/patch-act.dto";

export class UpdateActCommand {
    constructor(public readonly data: PatchActDto) {}
}