import { HType } from '../../models/habitans-type.model';

export class HTypeCreatedEvent {
  constructor(public readonly htype: HType) {}
}
