import { Column } from 'typeorm';
import { ObjectType, Field,} from '@nestjs/graphql';

@ObjectType('Address')
export class Address {
    @Field(()=> String)
    @Column({ nullable: true })
    zip?: string;
    @Column({ nullable: true })
    county?: string;
    @Column({ nullable: true })
    region?: string;
    @Column({ nullable: true })
    city?: string;
    @Column({ nullable: true })
    street?: string;
    @Column({ nullable: true })
    building?: string;
    @Column({ nullable: true })
    room?: string;
}