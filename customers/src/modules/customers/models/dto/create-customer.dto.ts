import { Address } from "../address.model"
import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class CreateCustomerDto {
    @Field()
    fullname: string
    label: string
    address: Address
    tel?: string
    email?: string
}