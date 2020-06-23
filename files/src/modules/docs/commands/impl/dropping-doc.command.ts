import { ReadStream } from 'fs';

export class DroppingDocCommand {
  constructor(
    public readonly file: ReadStream,
    public readonly actId: string,
    public readonly name: string,
  ) {}
}
