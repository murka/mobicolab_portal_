import { CustomerAddress } from '../customer-address.model';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerDto {
  @Field()
  fullname: string;
  @Field()
  label: string;
  @Field(type => CustomerAddress, { nullable: true })
  address?: CustomerAddress;
  @Field(type => String, { nullable: true })
  tel?: string;
  @Field(type => String, { nullable: true })
  email?: string;
}
