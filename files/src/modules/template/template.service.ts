import { Injectable, Logger } from '@nestjs/common';
import {
  TemplateModel,
  TemplateListModel,
} from './models/interfaces/template-model';
import { Item } from './models/interfaces/template-model';
import fs from 'fs';
import path from 'path';

const prePath = '../../../assets/pdf';

const fbuzNurItems = [
  {
    path: 'assets/FBUZ-nur/water.docx',
    file: fs.readFileSync(path.join(__dirname, prePath, 'FBUZ-nur/water.pdf')),
  },
];

const fbuzTumItems = [
  {
    path: 'assets/FBUZ-tum/bottom-sediments.docx',
    file: fs.readFileSync(
      path.join(__dirname, prePath, 'FBUZ-tum/bottom-sediments.pdf'),
    ),
  },
  {
    path: 'assets/FBUZ-tum/soil.docx',
    file: fs.readFileSync(path.join(__dirname, prePath, 'FBUZ-tum/soil.pdf')),
  },
  {
    path: 'assets/FBUZ-tum/surface-water.docx',
    file: fs.readFileSync(
      path.join(__dirname, prePath, 'FBUZ-tum/surface-water.pdf'),
    ),
  },
  {
    path: 'assets/FBUZ-tum/underground-water.docx',
    file: fs.readFileSync(
      path.join(__dirname, prePath, 'FBUZ-tum/underground-water.pdf'),
    ),
  },
];

const mobicolabItems = [
  {
    path: 'assets/mobicolab/air.docx',
    file: fs.readFileSync(path.join(__dirname, prePath, 'mobicolab/air.pdf')),
  },
  {
    path: 'assets/mobicolab/water.docx',
    file: fs.readFileSync(path.join(__dirname, prePath, 'mobicolab/water.pdf')),
  },
];

const tguItems = [
  {
    path: 'assets/FBUZ-tum/bottom-sediments.docx',
    file: fs.readFileSync(
      path.join(__dirname, prePath, 'TGU/bottom-sediments.pdf'),
    ),
  },
  {
    path: 'assets/FBUZ-tum/soil.docx',
    file: fs.readFileSync(path.join(__dirname, prePath, 'TGU/soil.pdf')),
  },
  {
    path: 'assets/FBUZ-tum/surface-water.docx',
    file: fs.readFileSync(
      path.join(__dirname, prePath, 'TGU/surface-water.pdf'),
    ),
  },
  {
    path: 'assets/FBUZ-tum/air.docx',
    file: fs.readFileSync(path.join(__dirname, prePath, 'TGU/air.pdf')),
  },
];

const zabSibEcoItems = [
  {
    path: 'assets/FBUZ-tum/bottom-sediments.docx',
    file: fs.readFileSync(
      path.join(__dirname, prePath, 'zab-sib-eco/bottom-sediments.pdf'),
    ),
  },
  {
    path: 'assets/FBUZ-tum/soil.docx',
    file: fs.readFileSync(
      path.join(__dirname, prePath, 'zab-sib-eco/soil.pdf'),
    ),
  },
  {
    path: 'assets/FBUZ-tum/water.docx',
    file: fs.readFileSync(
      path.join(__dirname, prePath, 'zab-sib-eco/water.pdf'),
    ),
  },
  {
    path: 'assets/FBUZ-tum/air.docx',
    file: fs.readFileSync(path.join(__dirname, prePath, 'zab-sib-eco/air.pdf')),
  },
];

@Injectable()
export class TemplateService {
  logger = new Logger(this.constructor.name);

  getAllTemplate(): TemplateListModel {
    this.logger.verbose('get-all-template.method');

    let templates: TemplateModel[] = [];
    let itemsMobico: Item[] = [];
    let itemsFBUZnur: Item[] = [];
    let itemsFBUZtum: Item[] = [];
    let itemsTGU: Item[] = [];
    let itemsZabSibEco: Item[] = [];

    fbuzNurItems.forEach(item => itemsFBUZnur.push(item));
    fbuzTumItems.forEach(item => itemsFBUZtum.push(item));
    mobicolabItems.forEach(item => itemsMobico.push(item));
    tguItems.forEach(item => itemsTGU.push(item));
    zabSibEcoItems.forEach(item => itemsZabSibEco.push(item));

    templates.push({
      label: 'МЭЛ',
      files: itemsMobico,
    });

    templates.push({
      label: 'ФБУЗ НУ',
      files: itemsFBUZnur,
    });

    templates.push({
      label: 'ФБУЗ ТЮМ',
      files: itemsFBUZtum,
    });

    templates.push({
      label: 'ТГУ',
      files: itemsTGU,
    });

    templates.push({
      label: 'ЗабСибЭко',
      files: itemsZabSibEco,
    });

    return { templates: templates };
  }
}
