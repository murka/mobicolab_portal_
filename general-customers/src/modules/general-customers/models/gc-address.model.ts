import { Column } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType('GCAdressInput')
export class GCAddress {
  @Field(() => String)
  @Column({ nullable: true })
  zip?: string;
  @Field(() => String)
  @Column({ nullable: true })
  country?: string;
  @Field(() => String)
  @Column({ nullable: true })
  region?: string;
  @Field(() => String)
  @Column({ nullable: true })
  city?: string;
  @Field(() => String)
  @Column({ nullable: true })
  street?: string;
  @Field(() => String)
  @Column({ nullable: true })
  building?: string;
  @Field(() => String)
  @Column({ nullable: true })
  room?: string;
}
