import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Act } from './act.model';
import { Address } from './address.model';

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
  public id: string;
  @Column()
  public fullname: string;
  @Column()
  public label: string;
  @Column(type => Address)
  public address: Address;
  @Column({ nullable: true })
  public tel?: string;
  @Column({ nullable: true })
  public email?: string;
  // define an actModel for apollo federation
  @Field(type => Act)
  @OneToMany(type => Act, act => act.customer)
  public acts: [Act];

  constructor(customer?: Partial<Customer>) {
    Object.assign(this, customer);
  }
}
