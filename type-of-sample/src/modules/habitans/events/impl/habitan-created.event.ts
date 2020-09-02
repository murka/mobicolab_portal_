import { Habitan } from '../../models/habitan.model';

export class HabitanCreatedEvent {
  constructor(public readonly habitan: Habitan) {}
}
