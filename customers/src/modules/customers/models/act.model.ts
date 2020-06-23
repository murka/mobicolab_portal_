import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Column, PrimaryColumn, Entity, ManyToOne } from 'typeorm'
import { Customer } from './customer.model';

//Model of Act for Apollo Federation usage

@Entity()
// @ObjectType('Act')
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Act {
  // @Field(type => ID)
  @Directive('@external')
  @PrimaryColumn()
  public id: string;

  // @Field(type => Customer)
  // @ManyToOne(type => Customer, customer => customer.acts, { cascade: true })
  // public customer: Customer;

  constructor(act: Partial<Customer>) {
    Object.assign(this, act);
  }
}
