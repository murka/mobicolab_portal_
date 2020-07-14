import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class NewLabTypeOfSampleTemplate {
    @Field()
    labId: string
    typeId: string
    path: string
}