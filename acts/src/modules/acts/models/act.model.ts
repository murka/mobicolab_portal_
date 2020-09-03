import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Customer } from '../../customers/models/customer.model';
import { GeneralCustomer } from '../../general-customers/models/general-customer.model';
import { Lab } from '../../labs/models/lab.model';
import { DateAndTime } from './date-time.model';
import { Application } from './application.model';
import { ActEvent } from './act-event.model';
import { Doc } from '../../files/models/doc.model';
import { AggregateRoot } from '@nestjs/cqrs';
import { ActUpdatedEvent } from '../events/impl/act-updated.event';
import { TypeOfSample } from 'src/modules/type-of-sample/models/type-of-sample.model';

export enum ActStatus {
  CREATED = 'CREATED',
  REGISTERED = 'REGISTERED',
  PROTOCOL = 'PROTOCOL',
  FULL = 'FULL',
}

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Act extends AggregateRoot {
  customerUpdated(aggregationId: string) {
    this.apply(new ActUpdatedEvent(this, 'Customer', aggregationId));
  }

  generalCustomerUpdated(aggregationId: string) {
    this.apply(new ActUpdatedEvent(this, 'GeneralCustomer', aggregationId));
  }

  labUpdated(aggregationId: string) {
    this.apply(new ActUpdatedEvent(this, 'Lab', aggregationId));
  }

  habitanUpdated(aggregationId: string) {
    this.apply(new ActUpdatedEvent(this, 'Habitan', aggregationId));
  }

  htypeUpdated(aggregationId: string) {
    this.apply(new ActUpdatedEvent(this, 'HThype', aggregationId));
  }

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(type => String)
  @Column()
  name: string;
  @Field(type => Customer)
  @ManyToOne(
    type => Customer,
    coustomer => coustomer.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  customer: Customer;
  @Field(type => GeneralCustomer)
  @ManyToOne(
    type => GeneralCustomer,
    general_customer => general_customer.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  generalCustomer: GeneralCustomer;
  @Field(type => Lab)
  @ManyToOne(
    type => Lab,
    lab => lab.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  lab: Lab;
  @Field(type => [Doc], { nullable: true })
  @OneToMany(
    type => Doc,
    docs => docs.act,
    { cascade: true, eager: true, onUpdate: 'CASCADE' },
  )
  docs: Doc[];
  @Field(type => TypeOfSample)
  @ManyToOne(
    type => TypeOfSample,
    tos => tos.acts,
    { cascade: true, eager: true },
  )
  typeOfSample: TypeOfSample;
  @Field()
  @Column({ nullable: true })
  objectName?: string;
  @Field()
  @Column({ nullable: true })
  place?: string;
  @Field(type => DateAndTime)
  @Column(type => DateAndTime)
  datetime: DateAndTime;
  @Field()
  @Column({ nullable: true })
  method?: string;
  @Field()
  @Column({ nullable: true })
  toolType?: string;
  @Field()
  @Column({ nullable: true })
  climaticEnvironmental?: string;
  @Field()
  @Column({ nullable: true })
  planning?: string;
  @Field(type => [String])
  @Column('text', { array: true, nullable: true })
  normativeDocument?: string[];
  @Field()
  @Column({ nullable: true })
  sampleType?: string;
  @Field(type => [String])
  @Column('text', { array: true, nullable: true })
  sample?: string[];
  @Field(type => [String])
  @Column('text', { array: true, nullable: true })
  preparation?: string[];
  @Field()
  @Column({ nullable: true })
  goal?: string;
  @Field(type => [String])
  @Column('text', { array: true, nullable: true })
  definedIndicators?: string[];
  @Field()
  @Column({ nullable: true })
  additions?: string;
  @Field()
  @Column({ nullable: true })
  informationAboutSelection?: string;
  @Field()
  @Column({ nullable: true })
  environmentalEngineer?: string;
  @Field()
  @Column({ nullable: true })
  representative?: string;
  @Field()
  @Column({ nullable: true })
  passedSample?: string;
  @Field(type => [Application])
  @OneToMany(
    type => Application,
    applications => applications.act,
    { deferrable: 'INITIALLY DEFERRED', eager: true },
  )
  applications?: Application[];
  @Field()
  @Column({ type: 'enum', enum: ActStatus, default: ActStatus.CREATED })
  status: string;
  @Field(type => Boolean)
  @Column({ type: 'boolean', default: true })
  isCorrect: boolean;
  @OneToMany(
    type => ActEvent,
    events => events.act,
    { cascade: true },
  )
  events?: ActEvent[];
}
