import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { HType } from './habitans-type.model';

export enum AllowEvent {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
export class HTypeEvent {
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
    type => HType,
    htype => htype.events,
  )
  @JoinColumn({ name: 'payload' })
  htype: HType;
  @CreateDateColumn()
  createdAt: string;
  @CreateDateColumn()
  updatedAt: string;
}
