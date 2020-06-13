import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { GeneralCustomer } from './general-customer.model';
import { PrimaryColumn, ManyToOne, Entity } from 'typeorm';

//Model of Act for Apollo Federation usage

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Act {
  @Field(type => ID)
  @Directive('@external')
  @PrimaryColumn()
  public id: string;

  @Field(type => GeneralCustomer)
  @ManyToOne(type => GeneralCustomer, general_customer => general_customer.acts, { cascade: true })
  public general_customer: GeneralCustomer;

  constructor(general_customer: Partial<GeneralCustomer>) {
    Object.assign(this, general_customer);
  }
}
