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
      new ColumnModel(true, "Номер", "name"),
      new ColumnModel(true, "Заказчик", "customer"),
      new ColumnModel(true, "Генеральный заказчик", "generalCustomer"),
      new ColumnModel(true, "Лаборатория", "lab"),
      new ColumnModel(true, "Дата отбора", "date"),
    ];
  }

  getFileters() {
    return [
      new ColumnModel(true, "Заказчик", "customer"),
      new ColumnModel(true, "Генеральный заказчик", "generalCustomer"),
      new ColumnModel(true, "Лаборатория", "lab"),
      //   new ColumnModel(true, "Дата отбора", "dateti"),
    ];
  }
}
