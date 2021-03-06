import { InputType, Field } from '@nestjs/graphql';
import { DateAndTime } from '../date-time.model';
import { Application } from '../application.model';
import { TypeOfSample } from 'src/modules/type-of-sample/models/type-of-sample.model';
import { TypeOfSampleInput } from './type-of-sample.input';

@InputType()
export class NewActDto {
  @Field()
  name: string;
  @Field()
  customer: string;
  @Field()
  generalCustomer: string;
  @Field()
  lab: string;
  @Field(type => TypeOfSampleInput)
  typeOfSample: TypeOfSampleInput;
  @Field()
  objectName?: string;
  @Field()
  place?: string;
  @Field()
  datetime: DateAndTime;
  @Field()
  method?: string;
  @Field()
  toolType?: string;
  @Field()
  climaticEnvironmental?: string;
  @Field()
  planning?: string;
  @Field(type => [String])
  normativeDocument?: string[];
  @Field()
  sampleType?: string;
  @Field(type => [String])
  sample?: string[];
  @Field(type => [String])
  preparation?: string[];
  @Field()
  goal?: string;
  @Field(type => [String])
  definedIndicators?: string[];
  @Field()
  additions?: string;
  @Field()
  informationAboutSelection?: string;
  @Field()
  environmentalEngineer?: string;
  @Field()
  representative?: string;
  @Field()
  passedSample?: string;
  @Field(type => [Application], { nullable: true })
  applications?: Application[];
}
