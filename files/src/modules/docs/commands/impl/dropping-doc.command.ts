import { ReadStream } from 'fs';

export class DroppingDocCommand {
  constructor(
    public readonly actId: string,
    public readonly name: string,
    public readonly file?: Buffer,
    public readonly mimtype?: string,
    public readonly title?: string,
  ) {}
}
