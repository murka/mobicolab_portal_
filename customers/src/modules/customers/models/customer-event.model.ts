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
import { Customer } from './customer.model';

export enum AllowEvent {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
export class CustomerEvent {
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
    type => Customer,
    customer => customer.events,
  )
  @JoinColumn({ name: 'payload' })
  customer: Customer;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
