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
    ];
  }

  getFileters() {
    return [
      new ColumnModel(true, "Заказчик", "customer", null),
      new ColumnModel(true, "Генеральный заказчик", "generalCustomer", null),
      new ColumnModel(true, "Лаборатория", "lab", null),
      new ColumnModel(true, "Дата отбора", "date", 'Date'),
    ];
  }
}
