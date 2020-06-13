import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, ObjectID, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Customer } from './customer.model';
import { GCustomer } from './general-customer.model';
import { Lab } from './lab.model';
import { TypeOfSample } from './type-of-sample.model';
import { DateAndTime } from './date-time.model';
import { Application } from './application.model';
import { Event } from './act-event.model';


@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Act extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Field(type => String)
  @Column()
  public name: string;
  @Field(type => Customer)
  @ManyToOne(type => Customer, coustomer => coustomer.acts, { cascade: true, onUpdate: 'CASCADE', })
  public customer: Customer;
  @ManyToOne(type => GCustomer, general_customer => general_customer.acts)
  public general_customer: GCustomer;
  @ManyToOne(type => Lab, lab => lab.acts)
  public lab: Lab;
  @Column(type => TypeOfSample)
  public typeOfSample: TypeOfSample;
  @Column()
  public objectName: string;
  @Column()
  public place: string;
  @Field(type => DateAndTime)
  @Column(type => DateAndTime)
  public datetime: DateAndTime;
  @Column()
  public method: string;
  @Column()
  public toolType: string;
  @Column()
  public climaticEnvironmental: string;
  @Column()
  public planning: string;
  @Column('text', {array: true})
  public normativeDocument: string[];
  @Column()
  public sampleType: string;
  @Column('text', {array: true})
  public sample: string[];
  @Column('text', {array: true})
  public preparation: string[];
  @Column()
  public goal: string;
  @Column('text', {array: true})
  public definedIndicators: string[];
  @Column()
  public additions: string;
  @Column()
  public informationAboutSelection: string;
  @Column()
  public environmentalEngineer: string;
  @Column()
  public representative: string;
  @Column()
  public passedSample: string;
  @Column(type => Application)
  public application: Application;
  @OneToMany(type => Event, event => event.act, { cascade: true })
  public events: Event[]
  
  constructor(act?: Partial<Act>) {
    super()
    Object.assign(this, act);
  }
}
