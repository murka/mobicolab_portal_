export class Habitan {
  public label: string;
  public htypes: {
    readonly id: string;
    label: string;
  }[];
  readonly id: string;

  constructor(options: {
    label: string;
    htypes?: { id: string; label: string }[];
  }) {
    this.label = options.label;
    this.htypes = options.htypes;
  }
}
