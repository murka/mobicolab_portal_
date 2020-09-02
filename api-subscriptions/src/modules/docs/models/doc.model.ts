import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Doc')
export class Doc {
  @Field(type => ID)
  id: string;
  title?: string;
  ydUrl?: string;
  name?: string;
  downloadable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
