export interface TemplateModel {
  label: string;
  itemsList: Item[];
}

interface Item {
  path: string;
  file: Uint8Array;
}
