import { Entity, Column } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType('LabAddressInput')
export class LabAddress {
  @Field({ nullable: true })
  @Column({ nullable: true })
  zip?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  country?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  region?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  street?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  building?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  room?: string;
}
