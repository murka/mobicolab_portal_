import { Address } from "../address.model"
import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class CreateGeneralCustomerDto {
    @Field()
    fullname: string
    label: string
    address: Address
    tel?: string
    email?: string
}