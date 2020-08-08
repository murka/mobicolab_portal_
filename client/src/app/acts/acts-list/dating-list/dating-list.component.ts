import { Component, OnInit, Input } from "@angular/core";
import { ActModel } from "src/app/shared/models/act.model";

@Component({
  selector: "app-dating-list",
  templateUrl: "./dating-list.component.html",
  styleUrls: ["./dating-list.component.scss"],
})
export class DatingListComponent implements OnInit {
  @Input() gcustomerActs: [string];
  @Input() set acts(acts: ActModel[]) {
    this._actController = acts;
    if (this.gcustomerActs) {
      this.createDatesArray(
        this.filterActsByGCustomer(acts, this.gcustomerActs)
      );
    }
  }
  get acts() {
    return this._actController;
  }

  filteredActsByGCustomer: ActModel[];
  yearsArray: { year: number; acts: ActModel[] }[];
  _actController: ActModel[];

  constructor() {}

  ngOnInit() {
    this.createDatesArray(
      this.filterActsByGCustomer(this.acts, this.gcustomerActs)
    );
  }

  filterActsByGCustomer(acts: ActModel[], customerActs: string[]): ActModel[] {
    return acts.filter((act) => customerActs.includes(act.id));
  }

  createDatesArray(acts: ActModel[]): void {
    let sort = acts.sort(
      (a, b) =>
        new Date(a.datetime.date).getTime() -
        new Date(b.datetime.date).getTime()
    );
    let yearsArray: { year: number; acts: ActModel[] }[] = [];
    const action = function (actss: ActModel[]) {
      let start = new Date(actss[0].datetime.date).getFullYear();
      let end = new Date(actss[actss.length - 1].datetime.date).getFullYear();
      if (start === end) {
        const year = { year: end, acts: actss };
        yearsArray.push(year);
      } else {
        let i = 1;
        do {
          i = i + 1;
        } while (
          new Date(actss[0].datetime.date).getFullYear() !==
          new Date(actss[actss.length - i].datetime.date).getFullYear()
        );
        const as = actss.slice(0, 1 - i);
        const k = new Date(actss[0].datetime.date).getFullYear();
        const year = { year: k, acts: as };
        yearsArray.push(year);
        const sa = actss.slice(1 - i);
        action(sa);
      }
    };
    action(sort);
    this.yearsArray = yearsArray;
  }
}
