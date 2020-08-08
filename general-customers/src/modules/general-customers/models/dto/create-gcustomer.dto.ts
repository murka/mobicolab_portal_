import { GCAddress } from '../gc-address.model';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGeneralCustomerDto {
  @Field()
  fullname: string;
  @Field()
  label: string;
  @Field({ nullable: true })
  address?: GCAddress;
  @Field({ nullable: true })
  tel?: string;
  @Field({ nullable: true })
  email?: string;
}
