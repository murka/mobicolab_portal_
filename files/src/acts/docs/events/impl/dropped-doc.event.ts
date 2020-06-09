import { FileUpload } from 'graphql-upload'
import { ReadStream } from 'fs';

export class DroppedDocEvent {
  constructor(
    public readonly docId: string,
    public readonly actId: string,
    public readonly file: ReadStream,
  ) {}
}
