import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Act } from './act.model';
import { CustomerAddress } from './customer-address.model';
import { CustomerEvent } from './customer-event.model';

// Model of Customer for TypeORM and GraphQl modules

// Entity decorator to define it as typeorm entity
@Entity()
// Object type decorator to define it as type of graphql
@ObjectType('Customer')
// directive to define class as useble in apollo federation
@Directive('@key(fields: "id")')
export class Customer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Field()
  @Column()
  fullname: string;
  @Field()
  @Column()
  label: string;
  @Field(type => CustomerAddress)
  @Column(type => CustomerAddress)
  address: CustomerAddress;
  @Field({ nullable: true })
  @Column({ nullable: true })
  tel?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;
  @Field(type => [CustomerEvent])
  @OneToMany(
    type => CustomerEvent,
    events => events.customer,
    { nullable: true },
  )
  events: CustomerEvent[];
  @OneToMany(
    type => Act,
    acts => acts.customer,
  )
  acts: Act[];
}
