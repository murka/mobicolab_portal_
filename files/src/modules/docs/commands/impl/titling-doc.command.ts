export class TitlingDocCommand {
  constructor(
    public readonly actId: string,
    public readonly docId: string,
    public readonly name: string,
    public readonly mimtype: string,
    public readonly title: string,
  ) {}
}
