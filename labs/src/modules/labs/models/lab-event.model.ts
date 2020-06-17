import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lab } from './lab.model';
import { registerEnumType, ObjectType, Field, ID } from '@nestjs/graphql';

export enum AllowEvent {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
@ObjectType()
export class LabEvent {
  @Field(type => ID)
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
