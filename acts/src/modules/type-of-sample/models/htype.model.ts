import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Act } from '../../acts/models/act.model';
import { TypeOfSample } from './type-of-sample.model';

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class HType {
  @Field(type => ID)
  @Directive('@external')
  @PrimaryColumn()
  id: string;
  @Field(type => [TypeOfSample])
  @OneToMany(
    type => TypeOfSample,
    tos => tos.htype,
    {
      cascade: true,
      onUpdate: 'CASCADE',
      eager: true,
      deferrable: 'INITIALLY DEFERRED',
    },
  )
  type_of_samples: TypeOfSample[];
}
