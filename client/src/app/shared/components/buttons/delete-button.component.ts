import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-delete-button",
  template: `<button mat-button type="button"><mat-icon svgIcon="delete_forever" aria-hidden="false"></mat-icon></button>`
})
export class DeleteButtonComponent implements OnInit {
  constructor(iconRegistory: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistory.addSvgIcon(
      "delete_forever",
      sanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/img/icons/delete_forever-24px.svg"
      )
    );
  }

  ngOnInit(): void {}
}
