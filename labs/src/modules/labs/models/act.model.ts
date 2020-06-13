import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Lab } from './lab.model';
import { PrimaryColumn, ManyToOne, Entity } from 'typeorm';

//Model of Act for Apollo Federation usage

@Entity()
@ObjectType('Act')
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Act {
  @Field(type => ID)
  @Directive('@external')
  @PrimaryColumn()
  public id: string;

  @Field(type => Lab)
  @ManyToOne(type => Lab, lab => lab.acts, { cascade: true })
  public lab: Lab;

  constructor(lab: Partial<Lab>) {
    Object.assign(this, lab);
  }
}
