import { CustomerAddress } from '../customer-address.model';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PatchCustomerDto {
  @Field()
  id: string;
  @Field({ nullable: true })
  fullname?: string;
  @Field({ nullable: true })
  label?: string;
  @Field({ nullable: true })
  address: CustomerAddress;
  @Field({ nullable: true })
  tel?: string;
  @Field({ nullable: true })
  email?: string;
}
