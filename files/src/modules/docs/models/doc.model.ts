import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
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
import { DocEvent } from './doc-event.model';

export enum Title {
  ACT = 'ACT',
  ACT_PDF = 'ACT_PDF',
  PROTOCOL = 'PROTOCOL',
  FINAL_PROTOCOL = 'FINAL_PROTOCOL',
}

@Entity()
@ObjectType('Doc')
@Directive('@key(fields: "id")')
export class Doc {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column({ type: 'enum', enum: Title, nullable: true })
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
  @OneToMany(
    type => DocEvent,
    event => event.payload,
    { nullable: true, onDelete: 'CASCADE' },
  )
  docEvents?: DocEvent[];
  @ManyToOne(
    type => Act,
    act => act.docs,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  act?: Act;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
