import { Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DateAndTime {
  @Field(type => Date)
  @CreateDateColumn({
    nullable: true,
    type: 'timestamp with time zone',
    transformer: {
      from: (value?: Date | null) => { console.log(value);
       value === undefined || value === null ? value : value.toDateString() },
        
      to: (value?: string | null) => { console.log(value);
       value === undefined || value === null ? value : new Date(value)},
    },
  })
  date?: Date | null;
  @Column({ nullable: true })
  time?: string;
}
