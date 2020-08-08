import { Column } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType('CustomerAddressInput')
export class CustomerAddress {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @Field(() => String)
  zip?: string;
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  country?: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  region?: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  city?: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  street?: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  building?: string;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  room?: string;
}
