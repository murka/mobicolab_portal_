import { GetAllActsQuery } from "src/types/generated";

export class DataSourceModel {
  public name: string;
<<<<<<< HEAD
  public customer: string;
  public generalCustomer: string;
  public lab: string;
  public date: string;

  constructor(options: GetAllActsQuery["getActs"][0]) {
    this.name = options.name;
    this.customer = options.customer.label;
    this.generalCustomer = options.generalCustomer.label;
    this.lab = options.lab.label;
    const formatter = new Intl.DateTimeFormat("ru", {
      month: "numeric",
      year: "numeric",
    });
    const d = formatter.format(new Date(options.datetime.date));
    this.date = `${d}`;
    console.log(this.date);
  }
}
=======
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
>>>>>>> filtering
