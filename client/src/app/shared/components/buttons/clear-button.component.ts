import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-clear-button",
  template: `<button mat-button type="button"><mat-icon svgIcon="clear" aria-hidden="false"></mat-icon></button>`
})
export class ClearButtonComponent implements OnInit {
  constructor(iconRegistory: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistory.addSvgIcon(
      "clear",
      sanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/img/icons/clear-24px.svg"
      )
    );
  }

  ngOnInit(): void {}
}
