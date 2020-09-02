export class UpdateActCommand {
  constructor(
    public readonly actId: string,
    public readonly customerId: string,
  ) {}
}
