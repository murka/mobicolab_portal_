import { GCAddress } from '../gc-address.model';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InsertGeneralCustomerDto {
  @Field()
  id: string;
  @Field({ nullable: true })
  fullname?: string;
  @Field({ nullable: true })
  label?: string;
  @Field({ nullable: true })
  address: GCAddress;
  @Field({ nullable: true })
  tel?: string;
  @Field({ nullable: true })
  email?: string;
}
