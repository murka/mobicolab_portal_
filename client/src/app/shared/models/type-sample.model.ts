export class TypeOfSample {
  public label: string;
  public htypes: string[];
  public id: string;

  constructor(options: { label: string; htypes?: string[] }) {
    this.label = options.label;
    this.htypes = options.htypes;
  }
}
