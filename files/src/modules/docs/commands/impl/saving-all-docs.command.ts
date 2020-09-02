export class SavingAllDocsCommand {
  constructor(
    public readonly actId: string,
    public readonly docs: { docId: string; file: Buffer }[],
  ) {}
}
