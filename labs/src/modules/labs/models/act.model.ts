import { Lab } from './lab.model';
import { PrimaryColumn, ManyToOne, Entity } from 'typeorm';

@Entity()
export class Act {
  @PrimaryColumn()
  id: string;
  @ManyToOne(
    type => Lab,
    lab => lab.acts,
    { cascade: true },
  )
  lab: Lab;
}
