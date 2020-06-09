import { Column } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class TypeOfSample {
    @Field(type => String)
    @Column()
    habitan: string;
    @Column()
    types: string;
}