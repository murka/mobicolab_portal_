import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
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
  // @OneToMany(type => Act, act => act.customer)
  // public acts: Act[];
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Field()
  @Column()
  public fullname: string;
  @Field()
  @Column()
  public label: string;
  @Field()
  @Column(type => CustomerAddress)
  public address: CustomerAddress;
  @Field()
  @Column({ nullable: true })
  public tel?: string;
  @Field()
  @Column({ nullable: true })
  public email?: string;
  @Field(type => [CustomerEvent])
  @OneToMany(type => CustomerEvent, events => events.customer, { nullable: true })
  events: CustomerEvent[]

  constructor(customer?: Partial<Customer>) {
    Object.assign(this, customer);
  }
}
