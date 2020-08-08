import { LabAddress } from '../lab-address.model';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLabDto {
  @Field()
  fullname: string;
  @Field()
  label: string;
  @Field({ nullable: true })
  address?: LabAddress;
  @Field({ nullable: true })
  tel?: string;
  @Field({ nullable: true })
  email?: string;
}
