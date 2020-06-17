import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Act } from './act.model';
import { LabAddress } from './lab-address.model';
import { LabEvent } from './lab-event.model';

//Model of Lab for TypeORM and GraphQl modules

// Entity decorator to define it as typeorm entity
@Entity()
// Object type decorator to define it as type of graphql
@ObjectType('Lab')
//directive to define class as useble in apollo federation
@Directive('@key(fields: "id")')
export class Lab {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column()
  public fullname: string;
  @Column()
  public label: string;
  @Column(type => LabAddress)
  public address: LabAddress;
  @Column({ nullable: true })
  public tel?: string;
  @Column({ nullable: true })
  public email?: string;
  //define an actModel for apollo federation
  // @OneToMany(
  //   type => Act,
  //   act => act.lab,
  // )
  // public acts: Act[];
  @OneToMany(
    type => LabEvent,
    events => events.lab,
  )
  events: LabEvent[];
  
  constructor(partial: Partial<Lab>) {
    Object.assign(this, partial);
  }
}
