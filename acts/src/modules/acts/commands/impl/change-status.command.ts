export class ChangeStatusCommand {
  constructor(public readonly actId: string, public readonly status: string) {}
}
