import { GeneralCustomer } from './general-customer.model';
import { PrimaryColumn, ManyToOne, Entity } from 'typeorm';

//Model of Act for Apollo Federation usage

@Entity()
export class Act {
  @PrimaryColumn()
  id: string;
  @ManyToOne(
    type => GeneralCustomer,
    general_customer => general_customer.acts,
    { cascade: true },
  )
  general_customer: GeneralCustomer;
}
