import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PdfTemplater {
  @Field(type => ID)
  id: string;
}
