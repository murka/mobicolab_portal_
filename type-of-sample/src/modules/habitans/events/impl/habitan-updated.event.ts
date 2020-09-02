import { Habitan } from '../../models/habitan.model';

export class HabitanUpdatedEvent {
  constructor(public readonly habitan: Habitan) {}
}
