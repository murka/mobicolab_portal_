import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Doc } from '../docs/models/doc.model';
import { Entity, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Act {
  @Field(type => ID)
  @PrimaryColumn()
  id: string;
  @Field(type => [Doc], { nullable: 'itemsAndList' })
  @OneToMany(type => Doc, docs => docs.act, { nullable: true, onDelete: 'SET NULL' })
  docs?: Doc[];
}
