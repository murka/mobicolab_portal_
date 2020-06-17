import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Act } from './act.model';
import { GCAddress } from './gc-address.model';
import { GSEvent } from './gc-event.model';

//Model of General customer for TypeORM and GraphQl modules

// Entity decorator to define it as typeorm entity
@Entity()
// Object type decorator to define it as type of graphql
@ObjectType('GeneralCustomer')
//directive to define class as useble in apollo federation
@Directive('@key(fields: "id")')
export class GeneralCustomer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column()
  public fullname: string;
  @Column()
  public label: string;
  @Column(type => GCAddress)
  public address: GCAddress;
  @Column({ nullable: true })
  public tel?: string;
  @Column({ nullable: true })
  public email?: string;
  //define an actModel for apollo federation
  // @Field(type => [Act])
  // @OneToMany(type => Act, act => act.general_customer)
  // public acts: Act[];
  @OneToMany(type => GSEvent, events => events.general_customer, { nullable: true })
  public evnets: GSEvent[]

  constructor(general_cusomer: Partial<GeneralCustomer>) {
    Object.assign(this, general_cusomer);
  }
}
