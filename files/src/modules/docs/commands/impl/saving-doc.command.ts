export class SavingDocCommand {
  constructor(
    public readonly actId: string,
    public readonly docId: string,
    public readonly file: Buffer,
  ) {}
}
