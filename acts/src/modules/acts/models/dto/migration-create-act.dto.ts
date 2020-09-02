import { DateAndTime } from '../date-time.model';
import { Application } from '../application.model';

export class MigrationCreateActDto {
  id: string;
  name: string;
  customer: string;
  generalCustomer: string;
  lab: string;
  typeOfSample?: {
    habitan?: string;
    htype?: string;
  };
  objectName?: string;
  place?: string;
  datetime: DateAndTime;
  method?: string;
  toolType?: string;
  climaticEnvironmental?: string;
  planning?: string;
  normativeDocument?: string[];
  sampleType?: string;
  sample?: string[];
  preparation?: string[];
  goal?: string;
  definedIndicators?: string[];
  additions?: string;
  informationAboutSelection?: string;
  environmentalEngineer?: string;
  representative?: string;
  passedSample?: string;
  application?: Application;
}
