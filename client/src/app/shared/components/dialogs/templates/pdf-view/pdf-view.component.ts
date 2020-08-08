import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { PdfViewerComponent } from "ng2-pdf-viewer";

import { File } from "src/app/shared/protos/template-preview_pb";

@Component({
  selector: "app-pdf-view",
  templateUrl: "./pdf-view.component.html",
  styleUrls: ["./pdf-view.component.scss"],
})
export class PdfViewComponent implements OnInit {
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent: PdfViewerComponent;
  @Input() file: string;

  pdfSrc: Uint8Array;

  constructor() {}

  ngOnInit(): void {
    const dataUrl = <string>this.file;
    this.pdfSrc = this.convertDataURIToBinary(dataUrl);
  }

  convertDataURIToBinary(dataURI: string) {
    const raw = window.atob(dataURI);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  pageRendered() {
    this.pdfComponent.pdfViewer.currentScaleValue = "page-fit";
  }
}
