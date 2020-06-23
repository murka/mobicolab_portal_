import { CustomerAddress } from "../customer-address.model"
import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class CreateCustomerDto {
    @Field()
    fullname: string
    label: string
    address: CustomerAddress
    tel?: string
    email?: string
}