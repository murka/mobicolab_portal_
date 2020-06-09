import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Act } from './act.model';
import { Address } from './address.model';

//Model of General customer for TypeORM and GraphQl modules

// Entity decorator to define it as typeorm entity
@Entity()
// Object type decorator to define it as type of graphql
@ObjectType('GeneralCustomer')
//Both directive to define class as useble in apollo federation
@Directive('@extends')
@Directive('@key(fields: "id")')
export class GeneralCustomer {
  @Field(() => ID)
  //directive to define id field for apollo federation
  @Directive('@external')
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column()
  public fullname: string;
  @Column()
  public label: string;
  @Column({ nullable: true })
  public address?: Address;
  @Column({ nullable: true })
  public tel?: string;
  @Column({ nullable: true })
  public email?: string;
  //define an actModel for apollo federation
  @OneToMany(type => Act, act => act.general_customer)
  public acts: [Act];

  constructor(act: Partial<Act>) {
    Object.assign(this, act);
  }
}
