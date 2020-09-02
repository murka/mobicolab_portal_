import { ObjectType, Field } from '@nestjs/graphql';
import { Habitan } from './habitan.model';
import { ManyToOne, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { HType } from './htype.model';
import { Act } from 'src/modules/acts/models/act.model';

@Entity()
@ObjectType()
export class TypeOfSample {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
  )
  acts: Act[];
  @Field(type => Habitan)
  @ManyToOne(
    type => Habitan,
    habitan => habitan.type_of_samples,
  )
  habitan: Habitan;
  @Field(type => HType)
  @ManyToOne(
    type => HType,
    htype => htype.type_of_samples,
  )
  htype: HType;
}
