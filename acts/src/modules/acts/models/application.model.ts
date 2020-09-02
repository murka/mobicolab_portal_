import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAndTime } from './date-time.model';
import { Act } from './act.model';

@Entity()
@InputType('ApplicationInput')
@ObjectType()
export class Application {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(type => String)
  @Column({ nullable: true })
  public place?: string;
  @Field(type => DateAndTime)
  @Column(type => DateAndTime)
  public datetime: DateAndTime;
  @ManyToOne(
    type => Act,
    act => act.applications,
    { cascade: true },
  )
  act: Act;
}
