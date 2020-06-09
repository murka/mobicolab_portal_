import { Component, OnInit, Input } from '@angular/core';
import { ActModel } from 'src/app/shared/models/act.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  @Input() acts: ActModel;

  constructor() { }

  ngOnInit() {
  }

}
