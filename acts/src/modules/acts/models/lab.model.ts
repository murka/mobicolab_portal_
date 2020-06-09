import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Act } from './act.model';
import { Entity, PrimaryColumn, OneToMany, BaseEntity } from 'typeorm';

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Lab {
  @Field(type => ID)
  @Directive('@external')
  @PrimaryColumn()
  public id: string;

  @Field(type => [Act])
  @OneToMany(type => Act, act => act.lab )
  public acts: Act[];

  // constructor(act?: Partial<Lab>) {
  //   super(),
  //   Object.assign(this, act);
  // }
}