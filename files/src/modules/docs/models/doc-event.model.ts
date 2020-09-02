import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Doc } from './doc.model';

export enum AllowedEvent {
  SAVED = 'SAVED',
}

@Entity()
export class DocEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(
    type => Doc,
    doc => doc.docEvents,
    { nullable: true, cascade: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'payload' })
  payload?: Doc;
  @Column({ type: 'enum', enum: AllowedEvent, nullable: true })
  event_type?: string;
  @Column()
  event_key: string;
  @Column()
  aggregateType: string;
  @Column()
  aggregateid: string;
  @CreateDateColumn()
  createdAt?: string;
  @CreateDateColumn()
  updatedAt?: string;
}
