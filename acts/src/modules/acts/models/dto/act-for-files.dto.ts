import { DateAndTime } from '../date-time.model';

export class ActForFilesDto {
  id: string;
  name: string;
  customer: {
    label: string;
  };
  general_customer: {
    label: string;
  };
  lab: {
    label: string;
  };
  datetime: DateAndTime;
}
