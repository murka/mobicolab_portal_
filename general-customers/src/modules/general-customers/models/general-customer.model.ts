import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Act } from './act.model';
import { GCAddress } from './gc-address.model';
import { GSEvent } from './gc-event.model';

//Model of General customer for TypeORM and GraphQl modules

// Entity decorator to define it as typeorm entity
@Entity()
// Object type decorator to define it as type of graphql
@ObjectType('GeneralCustomer')
//directive to define class as usable in apollo federation
@Directive('@key(fields: "id")')
export class GeneralCustomer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(type => String)
  @Column()
  fullname: string;
  @Field(type => String)
  @Column()
  label: string;
  @Field(type => GCAddress)
  @Column(type => GCAddress)
  address: GCAddress;
  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  tel?: string;
  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  email?: string;
  @Field(type => String)
  @OneToMany(
    type => GSEvent,
    events => events.general_customer,
    { nullable: true },
  )
  evnets: GSEvent[];
  @OneToMany(
    type => Act,
    act => act.general_customer,
  )
  acts: Act[];
}
