import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Habitan } from './habitan.model';
import { TypeOfSample } from './type-of-sample.model';

@Entity()
@ObjectType()
export class HabitansType {
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
  @Field(type => TypeOfSample)
  @OneToMany(
    type => TypeOfSample,
    type_of_samples => type_of_samples.htype,
  )
  type_of_samples: TypeOfSample[];
}
