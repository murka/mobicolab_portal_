import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Directive } from "@nestjs/graphql";
import { Act } from "./act.model";

@Entity()
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Doc {
    @Field(type => ID)
    @Directive('@external')
    @PrimaryColumn()
    id: string
    @ManyToOne(type => Act, act => act.docs)
    act: Act
}