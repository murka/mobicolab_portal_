import { ObjectType, Field, registerEnumType, ID } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity, JoinColumn } from 'typeorm';
import { Act } from 'src/acts/models/act.model';

@Entity()
@ObjectType("Doc")
export class Doc {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(type => Act, { nullable: true })
  @ManyToOne(type => Act, act => act.docs, { eager: false, cascade: true, })
  act?: Act
  @Column({ nullable: true })
  title?: string;
  @Column({ nullable: true })
  ydUrl?: string;
  @Column({ nullable: true })
  name?: string;
  @Column({ default: false })
  downloadable: boolean;
  @Field(type => [DocEvent], { nullable: 'itemsAndList'})
  @OneToMany(type => DocEvent, event => event.doc, { nullable: true, onDelete: 'CASCADE' })
  events?: DocEvent[];
  @CreateDateColumn()
  createdAt?: string
  @UpdateDateColumn()
  updatedAt?: string;

}

export enum AllowedEvent {
  DROPPED = "DROPPED",
  UPLOADED = "UPLOADED",
  DOWNLOADED = "DOWNLOADED",
  DELETED = "DELETED",
  TITLED = "TITLED",
  SAVED = "SAVED",
}

@Entity()
@ObjectType()
export class DocEvent {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(type => Doc, doc => doc.events, { nullable: true, cascade: true, onDelete: 'SET NULL' })
  doc?: Doc;
  @Column({type: "enum", enum: AllowedEvent, nullable: true})
  event?: string;
  @CreateDateColumn()
  createdAt?: string
  @UpdateDateColumn()
  updatedAt?: string;
}

registerEnumType(AllowedEvent, { name: 'AllowedEvent' });
