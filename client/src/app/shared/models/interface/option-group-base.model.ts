import { Habitan } from "../habitan.model";

export class OptionGroupBaseModel {
  public label: string;
  public htypes: ItemsGroupModel[];
  public key: string;

  constructor(options: Habitan) {
    this.label = options.label;
    options.htypes
      ? (this.htypes = [
          ...options.htypes.map(
            (item) => new ItemsGroupModel({ ...item, buttonController: false })
          ),
        ])
      : (this.htypes = []);
    this.key = options.id;
  }
}

export class ItemsGroupModel {
  public id: string;
  public label: string;
  public buttonController: boolean;
  constructor(options: {
    id?: string;
    label?: string;
    buttonController: boolean;
  }) {
    this.id = options.id;
    this.label = options.label;
    this.buttonController = options.buttonController;
  }
}
