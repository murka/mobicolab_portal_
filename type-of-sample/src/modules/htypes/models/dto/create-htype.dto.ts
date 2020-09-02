import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateHTypeDto {
  @Field(type => ID)
  habitanId: string;
  @Field(type => String)
  label: string;
}
