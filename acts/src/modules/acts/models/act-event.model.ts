import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Act } from './act.model';

export enum AllowEvents {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
export class ActEvent {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @ManyToOne(
    type => Act,
    act => act.events,
  )
  @JoinColumn({ name: 'payload' })
  act: Act;
  @Column({ type: 'enum', enum: AllowEvents, nullable: true })
  event_type: string;
  @Column()
  event_key: string;
  @Column()
  aggregateType: string;
  @Column()
  aggregateid: string;
  @CreateDateColumn()
  createdAt?: string;
  @UpdateDateColumn()
  updatedAt?: string;
}
