import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Act } from './act.model';

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class TypeOfSample {
  @Field(type => ID)
  @Directive('@external')
  @PrimaryColumn()
  public id: string;
  @Field(type => [Act])
  @OneToMany(
    type => Act,
    act => act.typeOfSample,
    {
      cascade: true,
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  acts: Act[];
}
