import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { registerEnumType } from '@nestjs/graphql';
import { GeneralCustomer } from './general-customer.model';

export enum AllowEvent {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: AllowEvent, nullable: true })
  event: string;
  @ManyToOne(
    type => GeneralCustomer,
    gcustomer => gcustomer,
  )
  general_customer: GeneralCustomer
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}

registerEnumType(AllowEvent, { name: 'AllowEvent' });
