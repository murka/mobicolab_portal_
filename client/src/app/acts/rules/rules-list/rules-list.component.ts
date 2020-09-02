import { Component, OnInit } from "@angular/core";
import { RulesService } from "src/app/services/data/rules.service";

@Component({
  selector: "app-rules-list",
  templateUrl: "./rules-list.component.html",
  styleUrls: ["./rules-list.component.scss"],
})
export class RulesListComponent implements OnInit {
  constructor(private readonly rulesService: RulesService) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.rulesService.choiseTemplate(false).subscribe();
  }
}
