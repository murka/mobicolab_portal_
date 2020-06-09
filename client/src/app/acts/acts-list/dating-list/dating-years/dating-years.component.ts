import { Component, OnInit, Input } from '@angular/core';
import { ActModel } from 'src/app/shared/models/act.model';

@Component({
  selector: 'app-dating-years',
  templateUrl: './dating-years.component.html',
  styleUrls: ['./dating-years.component.scss']
})
export class DatingYearsComponent implements OnInit {

  @Input() set acts(acts: ActModel[]) {
    this._actController = acts;
    this.creatMonths(acts);
  };
  get acts() {
    return this._actController;
  }

  months: object[];
  _actController: ActModel[];

  constructor() { }

  ngOnInit() {  
  }

  creatMonths (acts: ActModel[]) {
    let months: object[] = [];
    const action = function (acts: ActModel[]) {
      let start = new Date(acts[0].datetime.date).getMonth(); let end = new Date(acts[acts.length - 1].datetime.date).getMonth();
      if (start === end) {
        let year = {};
        year['month'] = new Date(acts[acts.length - 1].datetime.date);
        year['acts'] = acts;
        months.push(year);
        return;
      }
      else {    
        let i = 1;
        do {
          i = i + 1;
        } while (new Date(acts[0].datetime.date).getMonth() !== new Date(acts[acts.length - i].datetime.date).getMonth());
        let as = acts.slice(0, 1 - i);
        const k = new Date(acts[0].datetime.date);
        let year = {};
        year['month'] = k;
        year['acts'] = as;
        months.push(year);
        const sa = acts.slice(1 - i);  
        action(sa);
      }
    }
    action(acts);
    this.months = months;
  }

}
