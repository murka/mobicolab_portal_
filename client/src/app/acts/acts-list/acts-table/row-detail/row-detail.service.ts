import { Injectable } from "@angular/core";
import { GetWholeActQuery } from "src/types/generated";

@Injectable({
  providedIn: "root",
})
export class RowDetailService {
  constructor() {}

  getContent(act: GetWholeActQuery, fields: any[]) {
    const keys = Object.keys(act).slice(1, -1);

    fields.forEach((field) => {
      switch (typeof act[field.key]) {
        case "string":
      }
    });
  }
}
