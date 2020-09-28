import { Injectable } from "@angular/core";
import { ColumnModel } from "./models/column.model";
import { C } from "@angular/cdk/keycodes";

@Injectable({
  providedIn: "root",
})
export class DataTableService {
  constructor() {}

  getColumns() {
    return [
<<<<<<< HEAD
      new ColumnModel(true, "Номер", "name", "String"),
      new ColumnModel(true, "Заказчик", "customer", "Consumer"),
      new ColumnModel(
        true,
        "Генеральный заказчик",
        "generalCustomer",
        "Consumer"
      ),
      new ColumnModel(true, "Лаборатория", "lab", "Consumer"),
      new ColumnModel(true, "Дата отбора", "date", "Date"),
=======
      new ColumnModel(true, "Номер", "name"),
      new ColumnModel(true, "Заказчик", "customer"),
      new ColumnModel(true, "Генеральный заказчик", "generalCustomer"),
      new ColumnModel(true, "Лаборатория", "lab"),
      new ColumnModel(true, "Дата отбора", "date"),
>>>>>>> filtering
    ];
  }

  getFileters() {
    return [
<<<<<<< HEAD
      new ColumnModel(true, "Заказчик", "customer", null),
      new ColumnModel(true, "Генеральный заказчик", "generalCustomer", null),
      new ColumnModel(true, "Лаборатория", "lab", null),
      new ColumnModel(true, "Дата отбора", "date", 'Date'),
=======
      new ColumnModel(true, "Заказчик", "customer"),
      new ColumnModel(true, "Генеральный заказчик", "generalCustomer"),
      new ColumnModel(true, "Лаборатория", "lab"),
      //   new ColumnModel(true, "Дата отбора", "dateti"),
>>>>>>> filtering
    ];
  }
}
