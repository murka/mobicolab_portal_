import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { TypeOfSample } from './type-of-sample.model';

@Entity()
export class Act {
  @PrimaryColumn()
  id: string;
  @ManyToOne(
    type => TypeOfSample,
    type_of_sample => type_of_sample.acts,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  type_of_sample: TypeOfSample;
}
