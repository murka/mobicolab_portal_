import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Doc } from './doc.model';

@ObjectType()
export class DocSubscriptionsPayload {
  @Field(type => Doc)
  data: Doc;
  @Field(type => String)
  mutation: MutationType;
}

export enum MutationType {
  SAVED,
}

registerEnumType(MutationType, { name: 'MutationType' });
