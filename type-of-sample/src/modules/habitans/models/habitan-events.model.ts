import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Habitan } from './habitan.model';

export enum AllowEvent {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
export class HabitanEvent {
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
    type => Habitan,
    habitan => habitan.events,
  )
  @JoinColumn({ name: 'payload' })
  habitan: Habitan;
  @CreateDateColumn()
  createdAt: string;
  @CreateDateColumn()
  updatedAt: string;
}
