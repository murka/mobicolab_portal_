import { TypeOfSample } from "../type-of-sample.model";
import { DateAndTime } from "../date-time.model";
import { Application } from "../application.model";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class PatchActDto {
  @Field()
  id: string;
  name: string;
  customer: string;
  general_customer: string;
  lab: string;
  typeOfSample: TypeOfSample;
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
  application: Application;
}
