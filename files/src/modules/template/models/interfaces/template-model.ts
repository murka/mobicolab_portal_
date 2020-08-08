export interface TemplateModel {
  label: string;
  files: Item[];
}

export interface Item {
  path: string;
  file: Uint8Array;
}

export interface TemplateListModel {
  templates: TemplateModel[];
}
