import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { HType } from '../../htypes/models/habitans-type.model';
import { HabitanEvent } from './habitan-events.model';
import { Act } from 'src/modules/type-of-sample/models/act.model';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Habitan {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Field()
  @Column()
  label: string;
  @Field(type => [HType], { nullable: 'itemsAndList' })
  @OneToMany(
    type => HType,
    htypes => htypes.habitan,
    {
      cascade: true,
      onUpdate: 'CASCADE',
      eager: true,
      nullable: true,
    },
  )
  htypes: HType[];
  @OneToMany(
    type => HabitanEvent,
    events => events.habitan,
    { nullable: true },
  )
  events: HabitanEvent[];
  @OneToMany(
    type => Act,
    acts => acts.habitan,
    { nullable: true },
  )
  acts: Act[];
}
