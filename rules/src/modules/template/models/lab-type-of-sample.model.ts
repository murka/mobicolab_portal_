import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';

@Entity()
@Directive('@key(fields: "labId")')
@Directive('@key(fields: "typeOfSampleId")')
@ObjectType()
export class LabTypeOfSampleTemplateModel {
  @Field(type => String)
  @PrimaryColumn()
  labId: string;
  @PrimaryColumn()
  @Field(type => String)
  typeOfSampleId: string;
  @Column()
  @Field(type => String, { nullable: true })
  path: string;
}
