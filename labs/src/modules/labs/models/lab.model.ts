import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Act } from './act.model';
import { LabAddress } from './lab-address.model';
import { LabEvent } from './lab-event.model';
import { LabCreatedEvent } from '../events/impl/lab-created.event';
import { AggregateRoot } from '@nestjs/cqrs';

//Model of Lab for TypeORM and GraphQl modules

// Entity decorator to define it as typeorm entity
@Entity()
// Object type decorator to define it as type of graphql
@ObjectType('Lab')
//directive to define class as useble in apollo federation
@Directive('@key(fields: "id")')
export class Lab extends AggregateRoot {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(() => String)
  @Column()
  fullname: string;
  @Field(() => String)
  @Column()
  label: string;
  @Field(() => LabAddress)
  @Column(type => LabAddress)
  address: LabAddress;
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  tel?: string;
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  email?: string;
  @OneToMany(
    type => LabEvent,
    events => events.lab,
  )
  events: LabEvent[];
  @OneToMany(
    type => Act,
    act => act.lab,
  )
  acts: Act[];

  labCreated() {
    this.apply(new LabCreatedEvent(this));
  }
}
