import { Lab } from "../../models/lab.model";

export class LabUpdatedEvent {
    constructor(public readonly lab: Lab) {}
}