import { Component, OnInit, Input } from "@angular/core";
import { ActModel } from "src/app/shared/models/act.model";
import { GetCustomersWithActsQuery } from "src/types/generated";

@Component({
  selector: "app-dating-years",
  templateUrl: "./dating-years.component.html",
  styleUrls: ["./dating-years.component.scss"],
})
export class DatingYearsComponent implements OnInit {
  //   @Input() set acts(acts: ActModel[]) {
  //     this._actController = acts;
  //     this.creatMonths(acts);
  //   };
  //   get acts() {
  //     return this._actController;
  //   }

  @Input() acts: GetCustomersWithActsQuery["getCustomers"][0]["acts"];
  months: {
    month: Date;
    acts: GetCustomersWithActsQuery["getCustomers"][0]["acts"];
  }[];
  _actController: ActModel[];

  constructor() {}

  ngOnInit() {
    this.creatMonths(this.acts);
  }

  creatMonths(acts: GetCustomersWithActsQuery["getCustomers"][0]["acts"]) {
    let months: {
      month: Date;
      acts: GetCustomersWithActsQuery["getCustomers"][0]["acts"];
    }[] = [];
    const action = function (
      acts: GetCustomersWithActsQuery["getCustomers"][0]["acts"]
    ) {
      let start = new Date(acts[0].datetime.date).getMonth();
      let end = new Date(acts[acts.length - 1].datetime.date).getMonth();
      if (start === end) {
        let year = {
          month: new Date(acts[acts.length - 1].datetime.date),
          acts: acts,
        };
        months.push(year);
        return;
      } else {
        let i = 1;
        do {
          i = i + 1;
        } while (
          new Date(acts[0].datetime.date).getMonth() !==
          new Date(acts[acts.length - i].datetime.date).getMonth()
        );
        let as = acts.slice(0, 1 - i);
        const k = new Date(acts[0].datetime.date);
        let year = {
          month: k,
          acts: as,
        };
        months.push(year);
        const sa = acts.slice(1 - i);
        action(sa);
      }
    };
    action(acts);
    this.months = months;
  }
}
