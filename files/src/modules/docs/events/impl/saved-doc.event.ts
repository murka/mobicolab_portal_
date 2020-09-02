import { Doc } from '../../models/doc.model';

export class SavedDocEvent {
  constructor(
    public readonly doc: Doc,
    public readonly aggregateType: string,
    public readonly aggregationId: string,
  ) {}
}
