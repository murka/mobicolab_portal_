import { LabAddress } from "../lab-address.model"
import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class InsertLabDto {
    @Field()
    id: string
    fullname?: string
    label?: string
    address: LabAddress
    tel?: string
    email?: string
}