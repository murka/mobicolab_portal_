export class UpdateActByHabitanCommand {
  constructor(
    public readonly actId: string,
    public readonly habitanId: string,
  ) {}
}
