import { ObjectType, Field } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { DateAndTime } from "./date-time.model";

@ObjectType()
export class Application {
    @Field(type => String)
    @Column({ nullable: true })
    public place?: string;
    @Field(type => DateAndTime)
    @Column(type => DateAndTime )
    public datetime: DateAndTime

}