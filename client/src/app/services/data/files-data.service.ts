import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FilesDataService {
  constructor() {}

  convertDataURIToBinary(dataURI: string | Uint8Array) {
    const raw = window.atob(<string>dataURI);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
}
