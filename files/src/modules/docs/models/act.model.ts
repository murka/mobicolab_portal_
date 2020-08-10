import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Doc } from './doc.model';

@Entity()
export class Act {
  @PrimaryColumn()
  id: string;
  @OneToMany(
    type => Doc,
    docs => docs.act,
  )
  docs: Doc[];
}
