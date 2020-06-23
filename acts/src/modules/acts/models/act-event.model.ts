import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Act } from './act.model';

export enum AllowEvents {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
@ObjectType()
export class ActEvent {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @ManyToOne(
    type => Act,
    act => act.events,
  )
  public act: Act;
  @Column({ type: 'enum', enum: AllowEvents, nullable: true })
  public event?: string;
  @CreateDateColumn()
  createdAt?: string;
  @UpdateDateColumn()
  updatedAt?: string;
}

registerEnumType(AllowEvents, { name: 'AllowEvents' });
