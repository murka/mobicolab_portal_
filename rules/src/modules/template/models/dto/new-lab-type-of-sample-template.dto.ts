import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewLabTypeOfSampleTemplate {
  @Field()
  labId: string;
  @Field()
  typeId: string;
  @Field()
  path: string;
}
