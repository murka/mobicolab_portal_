import { Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType('DateTimeInput')
@ObjectType()
export class DateAndTime {
  @Field(type => Date)
  @CreateDateColumn({
    nullable: true,
    type: 'timestamp with time zone',
    //     transformer: {
    //       from: (value?: Date | null) => {
    //         console.log(value);
    //         value === undefined || value === null ? value : value;
    //       },

    //       to: (value?: string | null) => {
    //         console.log(value);
    //         value === undefined || value === null ? value : new Date(value);
    //       },
    //     },
  })
  date?: Date;
  @Field(type => String)
  @Column({ nullable: true })
  time?: string;
}
