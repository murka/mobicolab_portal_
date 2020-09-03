import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-edit-button",
  template: `<button mat-button>
    <mat-icon svgIcon="create" aria-hidden="false"></mat-icon>
  </button>`,
})
export class EditButtonComponent implements OnInit {
  constructor(iconRegistory: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistory.addSvgIcon(
      "create",
      sanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/img/icons/create-24px.svg"
      )
    );
  }

  ngOnInit(): void {}
}
