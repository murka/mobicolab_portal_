import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Act } from '../../acts/models/act.model';
import { Entity, PrimaryColumn, OneToMany, BaseEntity } from 'typeorm';

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Lab {
  @Field(type => ID)
  @Directive('@external')
  @PrimaryColumn()
  id: string;

  @Field(type => [Act])
  @OneToMany(
    type => Act,
    act => act.lab,
    { deferrable: 'INITIALLY DEFERRED' },
  )
  acts: Act[];
}
