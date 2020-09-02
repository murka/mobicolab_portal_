import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Habitan } from '../../habitans/models/habitan.model';
import { HTypeEvent } from './habitans-types-event.model';
import { Act } from 'src/modules/type-of-sample/models/act.model';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class HType {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Field()
  @Column()
  label: string;
  @Field(type => Habitan)
  @ManyToOne(
    type => Habitan,
    habitan => habitan.htypes,
  )
  habitan: Habitan;
  @OneToMany(
    type => HTypeEvent,
    events => events.htype,
    { nullable: true },
  )
  events: HTypeEvent[];
  @OneToMany(
    type => Act,
    acts => acts.htype,
  )
  acts: Act[];
}
