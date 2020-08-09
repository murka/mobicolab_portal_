import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { HabitansType } from './habitans-type.model';
import { TypeOfSample } from './type-of-sample.model';

@Entity()
@ObjectType()
export class Habitan {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Field()
  @Column()
  label: string;
  @Field(type => [HabitansType])
  @OneToMany(
    type => HabitansType,
    htypes => htypes.habitan,
    {
      cascade: true,
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  htypes: HabitansType[];
  @Field(type => [TypeOfSample])
  @OneToMany(
    type => TypeOfSample,
    type_of_samples => type_of_samples.habitan,
  )
  type_of_samples: TypeOfSample[];
}
