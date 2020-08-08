import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  ObjectID,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Customer } from './customer.model';
import { GeneralCustomer } from './general-customer.model';
import { Lab } from './lab.model';
import { TypeOfSample } from './type-of-sample.model';
import { DateAndTime } from './date-time.model';
import { Application } from './application.model';
import { ActEvent } from './act-event.model';
import { Doc } from './doc.model';
import { ActStatus } from './act-status.model';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Act {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Field(type => String)
  @Column()
  public name: string;
  @Field(type => Customer)
  @ManyToOne(
    type => Customer,
    coustomer => coustomer.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  public customer: Customer;
  @ManyToOne(
    type => GeneralCustomer,
    general_customer => general_customer.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  public general_customer: GeneralCustomer;
  @ManyToOne(
    type => Lab,
    lab => lab.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  public lab: Lab;
  @Field(type => [Doc], { nullable: true })
  @OneToMany(
    type => Doc,
    docs => docs.act,
    { cascade: true, eager: true, onUpdate: 'CASCADE' },
  )
  docs: Doc[];
  @ManyToOne(
    type => TypeOfSample,
    type_of_sample => type_of_sample.acts,
  )
  public typeOfSample: TypeOfSample;
  @Column({ nullable: true })
  public objectName?: string;
  @Column({ nullable: true })
  public place?: string;
  @Field(type => DateAndTime)
  @Column(type => DateAndTime)
  public datetime: DateAndTime;
  @Column({ nullable: true })
  public method?: string;
  @Column({ nullable: true })
  public toolType?: string;
  @Column({ nullable: true })
  public climaticEnvironmental?: string;
  @Column({ nullable: true })
  public planning?: string;
  @Column('text', { array: true })
  public normativeDocument?: string[];
  @Column({ nullable: true })
  public sampleType?: string;
  @Column('text', { array: true, nullable: true })
  public sample?: string[];
  @Column('text', { array: true, nullable: true })
  public preparation?: string[];
  @Column({ nullable: true })
  public goal?: string;
  @Column('text', { array: true, nullable: true })
  public definedIndicators?: string[];
  @Column({ nullable: true })
  public additions?: string;
  @Column({ nullable: true })
  public informationAboutSelection?: string;
  @Column({ nullable: true })
  public environmentalEngineer?: string;
  @Column({ nullable: true })
  public representative?: string;
  @Column({ nullable: true })
  public passedSample?: string;
  @Column(type => Application)
  public application: Application;
  @Column({ type: 'enum', enum: ActStatus, default: ActStatus.CREATED })
  status: string;
  @OneToMany(
    type => ActEvent,
    event => event.act,
    { cascade: true, nullable: true },
  )
  public events?: ActEvent[];

  constructor(act?: Partial<Act>) {
    Object.assign(this, act);
  }
}
