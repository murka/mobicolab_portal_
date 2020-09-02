import { HType } from '../../models/habitans-type.model';

export class HTypeUpdatedEvent {
  constructor(public readonly hytpe: HType) {}
}
