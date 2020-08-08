import { LabAddress } from '../lab-address.model';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InsertLabDto {
  @Field()
  id: string;
  @Field({ nullable: true })
  fullname?: string;
  @Field({ nullable: true })
  label?: string;
  @Field({ nullable: true })
  address: LabAddress;
  @Field({ nullable: true })
  tel?: string;
  @Field({ nullable: true })
  email?: string;
}
