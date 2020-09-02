import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TitlingDocInput {
  @Field()
  actId: string;
  @Field()
  docId: string;
  @Field()
  name: string;
  @Field()
  title: string;
  @Field()
  mimtype: string;
}
