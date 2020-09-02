export class TypeOfSample {
  constructor(
    public habitan: {
      id: string;
      label: string;
      htype: { id: string; lable: string };
    }
  ) {}
}
