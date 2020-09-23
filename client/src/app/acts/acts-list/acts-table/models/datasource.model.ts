import { GetAllActsQuery } from "src/types/generated";

export class DataSourceModel {
  public name: string;
  public customer: item;
  public generalCustomer: item;
  public lab: item;
  public date: item;

  constructor(options: GetAllActsQuery["getActs"][0]) {
    (this.name = options.name),
      (this.customer = options.customer),
      (this.generalCustomer = options.generalCustomer),
      (this.lab = options.lab);
    //   this.date = options.
  }
}

class item {
  constructor(public id: string, public label: string) {}
}
