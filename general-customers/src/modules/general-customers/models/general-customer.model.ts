import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Act } from './act.model';
import { Address } from './address.model';
import { Event } from './event.model';

//Model of General customer for TypeORM and GraphQl modules

// Entity decorator to define it as typeorm entity
@Entity()
// Object type decorator to define it as type of graphql
@ObjectType('GeneralCustomer')
//Both directive to define class as useble in apollo federation
@Directive('@extends')
@Directive('@key(fields: "id")')
export class GeneralCustomer {
  @Field(() => ID)
  //directive to define id field for apollo federation
  @Directive('@external')
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fullname: string;
  @Column()
  label: string;
  @Column({ nullable: true })
  address?: Address;
  @Column({ nullable: true })
  tel?: string;
  @Column({ nullable: true })
  email?: string;
  //define an actModel for apollo federation
  @Field(type => Act)
  @OneToMany(type => Act, act => act.general_customer)
  acts: [Act];
  @OneToMany(type => Event, events => events.general_customer, { nullable: true })
  evnets: Event[]

  constructor(act: Partial<Act>) {
    Object.assign(this, act);
  }
}
