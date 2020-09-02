import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TypeOfSampleInput {
  @Field()
  habitan: string;
  @Field()
  htype: string;
}
