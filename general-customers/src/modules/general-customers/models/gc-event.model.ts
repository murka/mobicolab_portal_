import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { GeneralCustomer } from './general-customer.model';

export enum AllowEvent {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
export class GSEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: AllowEvent, nullable: true })
  event_type: string;
  @PrimaryColumn()
  event_key: string;
  @Column()
  aggregateType: string;
  @Column()
  aggregateid: string;
  @ManyToOne(
    type => GeneralCustomer,
    customer => customer.events,
  )
  @JoinColumn({ name: 'payload' })
  general_customer: GeneralCustomer;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
