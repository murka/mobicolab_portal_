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
import { Lab } from './lab.model';

export enum AllowEvent {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
export class LabEvent {
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
    type => Lab,
    lab => lab.events,
  )
  @JoinColumn({ name: 'payload' })
  lab: Lab;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
