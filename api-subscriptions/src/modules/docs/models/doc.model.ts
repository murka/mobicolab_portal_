import { ObjectType, Field, registerEnumType, ID, Directive } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity, JoinColumn } from 'typeorm';

@Entity()
@ObjectType("Doc")
@Directive('@key(fields: "id")')
export class Doc {
  // @ManyToOne(type => Act, act => act.docs, { cascade: true, })
  // act?: Act
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
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
