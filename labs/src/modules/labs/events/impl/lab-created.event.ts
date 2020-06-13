import { Lab } from "../../models/lab.model";

export class LabCreatedEvent {
  constructor(public readonly lab: Lab) {}
}
