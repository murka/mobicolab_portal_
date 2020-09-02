import { Act } from '../../models/act.model';

export class ActUpdatedEvent {
  constructor(
    public readonly act: Act,
    public readonly aggregateType: string,
    public readonly aggregationId: string,
  ) {}
}
