import { Column, PrimaryColumn, Entity, ManyToOne } from 'typeorm';
import { Customer } from './customer.model';

//Model of Act for Apollo Federation usage

@Entity()
export class Act {
  @PrimaryColumn()
  id: string;
  @ManyToOne(
    type => Customer,
    customer => customer.acts,
    { cascade: true },
  )
  customer: Customer;
}
