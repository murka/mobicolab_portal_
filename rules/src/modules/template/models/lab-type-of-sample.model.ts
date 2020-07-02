import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';

@Entity()
@Directive('@key(fields: "labId", "typeOfSampleId")')
@ObjectType()
export class LabTypeOfSampleTemplateModel {
  @Field(type => String)
  @PrimaryColumn()
  labId: string;
  @PrimaryColumn()
  typeOfSampleId: string;
  @Column()
  path: string;
}
