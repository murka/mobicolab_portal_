export class CreateLabTypeTemplateCommand {
  constructor(
    public readonly labId: string,
    public readonly typeId: string,
    public readonly path: string,
  ) {}
}
