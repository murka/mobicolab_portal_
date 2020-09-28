import { Pipe, PipeTransform } from "@angular/core";
import { FilterItem } from "../models/fileter.item.modle";

@Pipe({
  name: "filterOptions",
  pure: false,
})
export class FilterOptionsPipe implements PipeTransform {
  transform(items: FilterItem[]): FilterItem[] {
    return items.filter((item) => item.isActive);
  }
}
