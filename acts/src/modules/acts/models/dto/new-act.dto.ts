import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class NewActDto {
    @Field(type => String)
    name: string
}