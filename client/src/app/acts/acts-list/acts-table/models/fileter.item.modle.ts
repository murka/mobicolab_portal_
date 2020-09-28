export class FilterItem {
  constructor(
    public label: string,
    public key: string,
<<<<<<< HEAD
    public removable: boolean,
    public controlType: string,
=======
>>>>>>> filtering
    public isActive: boolean,
    public items: Item[]
  ) {}
}

export class Item {
  constructor(
    public id: string,
    public lable: string,
    public isChecked: boolean,
    public disabled: boolean
  ) {}
}
