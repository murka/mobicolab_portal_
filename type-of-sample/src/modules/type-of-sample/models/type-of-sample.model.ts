import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HabitansType } from './habitans-type.model';
import { Habitan } from './habitan.model';
import { Act } from './act.model';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class TypeOfSample {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Field(type => Habitan)
  @ManyToOne(
    type => Habitan,
    habitan => habitan.label,
    { cascade: true, eager: true, onUpdate: 'CASCADE' },
  )
  habitan: Habitan;
  @Field(type => HabitansType)
  @ManyToOne(
    type => HabitansType,
    htype => htype.label,
    { cascade: true, eager: true, onUpdate: 'CASCADE' },
  )
  htype: HabitansType;
  @OneToMany(
    type => Act,
    acts => acts.type_of_sample,
  )
  acts: Act[];
}
