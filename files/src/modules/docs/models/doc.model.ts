import {
  ObjectType,
  Field,
  registerEnumType,
  ID,
  Directive,
} from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Act } from './act.model';

@Entity()
@ObjectType('Doc')
@Directive('@key(fields: "id")')
export class Doc {
  // @ManyToOne(type => Act, act => act.docs, { cascade: true, })
  // act?: Act
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column({ nullable: true })
  title?: string;
  @Field()
  @Column({ nullable: true })
  ydUrl?: string;
  @Field()
  @Column({ nullable: true })
  name?: string;
  @Field()
  @Column({ default: false })
  downloadable: boolean;
  @Field(type => [DocEvent], { nullable: 'itemsAndList' })
  @OneToMany(
    type => DocEvent,
    event => event.doc,
    { nullable: true, onDelete: 'CASCADE' },
  )
  docEvents?: DocEvent[];
  @ManyToOne(
    type => Act,
    act => act.docs,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  act: Act;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}

export enum AllowedEvent {
  DROPPED = 'DROPPED',
  UPLOADED = 'UPLOADED',
  DOWNLOADED = 'DOWNLOADED',
  DELETED = 'DELETED',
  TITLED = 'TITLED',
  SAVED = 'SAVED',
}

@Entity()
@ObjectType()
export class DocEvent {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(
    type => Doc,
    doc => doc.docEvents,
    { nullable: true, cascade: true, onDelete: 'SET NULL' },
  )
  doc?: Doc;
  @Column({ type: 'enum', enum: AllowedEvent, nullable: true })
  event?: string;
  @CreateDateColumn()
  createdAt?: string;
  @UpdateDateColumn()
  updatedAt?: string;
}

registerEnumType(AllowedEvent, { name: 'AllowedEvent' });
