import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Doc } from './doc.model';
import { Entity, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
// @ObjectType()
// @Directive('@extends')
// @Directive('@key(fields: "id")')
export class Act {
  // @Field(type => ID)
  @PrimaryColumn()
  id: string;
  // @Field(type => [Doc], { nullable: 'itemsAndList' })
  // @OneToMany(type => Doc, docs => docs.act, { nullable: true, onDelete: 'SET NULL', eager: true })
  // docs?: Doc[];
}
