import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SavingAllDocsInput {
  @Field(() => String)
  actId: string;
  docs: string[];
}
