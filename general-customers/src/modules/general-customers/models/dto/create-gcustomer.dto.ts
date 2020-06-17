import { GCAddress } from "../gc-address.model"
import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class CreateGeneralCustomerDto {
    @Field()
    fullname: string
    label: string
    address: GCAddress
    tel?: string
    email?: string
}