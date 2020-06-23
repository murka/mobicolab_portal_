import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SavingDocInput {
  @Field(() => String)
  docId: string;
  actId: string;
}
