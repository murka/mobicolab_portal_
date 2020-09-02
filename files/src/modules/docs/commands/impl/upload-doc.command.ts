import { Doc } from '../../models/doc.model';

export class UploadDocCommand {
  constructor(
    public readonly actId: string,
    public readonly doc: Doc,
    public readonly file: Buffer,
  ) {}
}
