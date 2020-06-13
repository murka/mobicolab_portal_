import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lab } from './lab.model';
import { registerEnumType } from '@nestjs/graphql';

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
    type => Lab,
    lab => lab.events,
  )
  lab: Lab
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}

registerEnumType(AllowEvent, { name: 'AllowEvent' });
