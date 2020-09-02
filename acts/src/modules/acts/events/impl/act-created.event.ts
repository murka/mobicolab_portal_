import { Act } from '../../models/act.model';

export class ActCreatedEvent {
  constructor(
    public readonly act: Act,
    public readonly aggregateType: string,
    public readonly aggregationId: string,
  ) {}
}
