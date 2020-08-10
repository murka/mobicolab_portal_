export class Habitan {
  public label: string;
  public htypes: string[];
  readonly id: string;

  constructor(options: { label: string; htypes?: string[] }) {
    this.label = options.label;
    this.htypes = options.htypes;
  }
}
